// Copyright 2013 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package cover

import (
	"bufio"
	"fmt"
	"html/template"
	"io"
	"math"
	"os"
	"path/filepath"
	"strings"

	"github.com/skelouse/cover-pretty/go/browser"
	"golang.org/x/tools/cover"
)

// HtmlOutput reads the profile data from profile and generates an HTML
// coverage report, writing it to outfile. If outfile is empty,
// it writes the report to a temporary file and opens it in a web browser.
func HtmlOutput(profile, outfile string) error {
	profiles, err := cover.ParseProfiles(profile)
	if err != nil {
		return err
	}

	var d templateData

	dirs, err := findPkgs(profiles)
	if err != nil {
		return err
	}

	// Find the common prefix between all files
	var filePrefix string
	if len(profiles) != 0 {
		for _, profile := range profiles {
			if filePrefix == "" {
				filePrefix = profile.FileName
			} else {
				for i := 0; i < len(filePrefix) && i < len(profile.FileName); i++ {
					if filePrefix[i] != profile.FileName[i] {
						filePrefix = filePrefix[:i]
						break
					}
				}
			}
		}
	}
	d.Header = filePrefix

	d.Files = make(map[string]*templateFile)
	d.RawFiles = make([]*templateFile, len(profiles))
	for idx, profile := range profiles {
		fn := profile.FileName
		if profile.Mode == "set" {
			d.Set = true
		}
		file, err := findFile(dirs, fn)
		if err != nil {
			return err
		}
		src, err := os.ReadFile(file)
		if err != nil {
			return fmt.Errorf("can't read %q: %v", fn, err)
		}
		var buf strings.Builder
		err = htmlGen(&buf, src, profile.Boundaries(src))
		if err != nil {
			return err
		}

		fileSuffix := strings.TrimPrefix(fn, filePrefix)

		tmplFile := &templateFile{
			Idx:      idx,
			Name:     fileSuffix,
			Body:     template.HTML(buf.String()),
			Coverage: percentCovered(profile),
			Files:    make(map[string]*templateFile),
		}
		d.RawFiles[idx] = tmplFile

		path := strings.Split(fileSuffix, "/")
		if len(path) == 1 {
			d.Files[fileSuffix] = tmplFile
			continue
		}

		location := d.Files
		for idx, dir := range path {
			if idx == len(path)-1 {
				fileSuffix = dir
				continue
			}
			tmplFile.Indent = idx * 3

			_loc, ok := location[dir]
			if !ok {
				_loc = &templateFile{
					Name:   dir,
					IsDir:  true,
					Indent: tmplFile.Indent,
					Files:  make(map[string]*templateFile),
				}
				location[dir] = _loc
			}

			location = _loc.Files
		}
		location[fileSuffix] = tmplFile
	}

	var jsOut, htmlOut *os.File
	var jsFilePath, htmlFilePath string

	if outfile == "" {
		var dir string
		dir, err = os.MkdirTemp("", "cover")
		if err != nil {
			return err
		}

		jsFilePath = filepath.Join(dir, "coverage.js")
		htmlFilePath = filepath.Join(dir, "index.html")

		jsOut, err = os.Create(jsFilePath)
		if err != nil {
			return err
		}
		defer jsOut.Close()

		htmlOut, err = os.Create(htmlFilePath)
		if err != nil {
			return err
		}
		defer htmlOut.Close()

	} else {
		jsOut, err = os.Create(outfile)
		if err != nil {
			return err
		}
		defer jsOut.Close()

		// If outfile is provided, generate the HTML file next to the JavaScript file
		htmlFilePath = outfile[:len(outfile)-len(filepath.Ext(outfile))] + ".html"
		htmlOut, err = os.Create(htmlFilePath)
		if err != nil {
			return err
		}
		defer htmlOut.Close()
	}

	// Execute JavaScript template
	// err = jsTemplate.Execute(jsOut, d)
	// if err != nil {
	// 	return err
	// }

	// Execute HTML template
	err = generateHTML(htmlFilePath, d)
	if err != nil {
		return err
	}

	// Print paths to generated files
	fmt.Printf("HTML and JavaScript generated:\n- %s\n", htmlFilePath)

	// Optionally, open the HTML file in a browser
	if outfile == "" {
		if !browser.Open("file://" + strings.Replace(htmlFilePath, "index.html", "/index.html", -1)) {
			fmt.Fprintf(os.Stderr, "HTML output written to %s\n", htmlFilePath)
		}
	}

	return nil
}

// percentCovered returns, as a percentage, the fraction of the statements in
// the profile covered by the test run.
// In effect, it reports the coverage of a given source file.
func percentCovered(p *cover.Profile) float64 {
	var total, covered int64
	for _, b := range p.Blocks {
		total += int64(b.NumStmt)
		if b.Count > 0 {
			covered += int64(b.NumStmt)
		}
	}
	if total == 0 {
		return 0
	}
	return float64(covered) / float64(total) * 100
}

// htmlGen generates an HTML coverage report with the provided filename,
// source code, and tokens, and writes it to the given Writer.
func htmlGen(w io.Writer, src []byte, boundaries []cover.Boundary) error {
	dst := bufio.NewWriter(w)
	for i := range src {
		for len(boundaries) > 0 && boundaries[0].Offset == i {
			b := boundaries[0]
			if b.Start {
				n := 0
				if b.Count > 0 {
					n = int(math.Floor(b.Norm*9)) + 1
				}
				fmt.Fprintf(dst, `<span class="cov%v" title="%v">`, n, b.Count)
			} else {
				dst.WriteString("</span>")
			}
			boundaries = boundaries[1:]
		}
		switch b := src[i]; b {
		case '>':
			dst.WriteString("&gt;")
		case '<':
			dst.WriteString("&lt;")
		case '&':
			dst.WriteString("&amp;")
		case '\t':
			dst.WriteString("        ")
		default:
			dst.WriteByte(b)
		}
	}
	return dst.Flush()
}

type templateData struct {
	Header   string
	Files    map[string]*templateFile
	RawFiles []*templateFile
	Set      bool
}

// PackageName returns a name for the package being shown.
// It does this by choosing the penultimate element of the path
// name, so foo.bar/baz/foo.go chooses 'baz'. This is cheap
// and easy, avoids parsing the Go file, and gets a better answer
// for package main. It returns the empty string if there is
// a problem.
func (td templateData) PackageName() string {
	if len(td.Files) == 0 {
		return ""
	}

	for _, folder := range td.Files {
		if len(folder.Files) == 0 {
			continue
		}
		for _, file := range folder.Files {
			parts := strings.Split(file.Name, "/")
			if len(parts) < 2 {
				return ""
			}
			return parts[len(parts)-2]
		}
	}
	return ""
}

type templateFile struct {
	Idx      int
	Name     string
	Body     template.HTML
	Coverage float64
	IsDir    bool
	Files    map[string]*templateFile
	Indent   int
}
