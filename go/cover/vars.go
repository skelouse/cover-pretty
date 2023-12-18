package cover

import (
	"embed"
	"encoding/json"
	"fmt"
	"html/template"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
)

var htmlTemplate = template.Must(template.New("html").Parse(`
<!DOCTYPE html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width,initial-scale=1" />
		<meta
		name="description"
		content="Web site created using create-react-app"
		/>
		<title>Coverage: {{ .Template.Header }}</title>
		<script type="application/javascript">
			window.myInjectedData = {{ .Template }};
		</script>
		{{ .Style }}
    </head>
	<body>
		<noscript>You need to enable JavaScript to run this app.</noscript>
		<div id="root"></div>
		{{ .Index }}
	</body>
</html>
`))

//go:embed react-coverage/build/asset-manifest.json
var reactManifest []byte

// ManifestData represents the structure of asset-manifest.json
type ManifestData struct {
	Files       map[string]string `json:"files"`
	Entrypoints []string          `json:"entrypoints"`
}

//go:embed react-coverage/build/*
var reactAppBuild embed.FS

func generateHTML(htmlFilePath string, tData templateData) error {
	// Parse the manifest file
	var manifest ManifestData
	err := json.Unmarshal(reactManifest, &manifest)
	if err != nil {
		return fmt.Errorf("failed to parse manifest file: %w", err)
	}

	// Get the main JavaScript file path from the manifest
	mainJSRelPath, okJS := manifest.Files["main.js"]
	mainCSSRelPath, okCSS := manifest.Files["main.css"]
	if !okJS || !okCSS {
		return fmt.Errorf("main.js or main.css not found in manifest")
	}

	// Full paths within the embedded file system
	mainJSFullPath := filepath.Join("react-coverage/build", strings.TrimPrefix(mainJSRelPath, "/"))
	mainCSSFullPath := filepath.Join("react-coverage/build", strings.TrimPrefix(mainCSSRelPath, "/"))

	// Check if the files exist in the embedded file system
	if _, err := fs.Stat(reactAppBuild, mainJSFullPath); err != nil {
		return fmt.Errorf("main.js file does not exist in embedded file system: %w", err)
	}
	if _, err := fs.Stat(reactAppBuild, mainCSSFullPath); err != nil {
		return fmt.Errorf("main.css file does not exist in embedded file system: %w", err)
	}

	// Read the main JavaScript and CSS files
	mainJSFile, err := fs.ReadFile(reactAppBuild, mainJSFullPath)
	if err != nil {
		return fmt.Errorf("failed to read main.js file: %w", err)
	}
	mainCSSFile, err := fs.ReadFile(reactAppBuild, mainCSSFullPath)
	if err != nil {
		return fmt.Errorf("failed to read main.css file: %w", err)
	}

	// Data to pass to the template
	data := struct {
		Template templateData
		Index    template.HTML
		Style    template.HTML
	}{
		Template: tData,
		Index:    template.HTML(`<script defer="defer" type="application/javascript">` + string(mainJSFile) + "</script>"),
		Style:    template.HTML(`<style>` + string(mainCSSFile) + `</style>`),
	}

	out, err := os.Create(htmlFilePath)
	if err != nil {
		return err
	}
	defer out.Close()

	outputDir := filepath.Dir(htmlFilePath)
	err = extractEmbeddedFiles(reactAppBuild, ".", outputDir)
	if err != nil {
		return fmt.Errorf("failed to extract React build directory: %w", err)
	}

	err = htmlTemplate.Execute(out, data)
	if err != nil {
		return err
	}

	return nil
}

func extractEmbeddedFiles(embeddedFS embed.FS, src, dst string) error {
	return fs.WalkDir(embeddedFS, src, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		relativePath, err := filepath.Rel(src, path)
		if err != nil {
			return err
		}

		outPath := filepath.Join(dst, relativePath)

		if d.IsDir() {
			if err := os.MkdirAll(outPath, 0755); err != nil {
				return err
			}
		} else {
			data, err := embeddedFS.ReadFile(path)
			if err != nil {
				return err
			}

			if err := os.WriteFile(outPath, data, 0644); err != nil {
				return err
			}
		}
		return nil
	})
}
