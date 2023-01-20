package parse

import (
	"fmt"
	"path/filepath"

	"github.com/skelouse/cover-pretty/go/cover"
)

type parser struct {
	coverFilePath string
}

func New(coverFilePath string, outFilePath string) (*parser, error) {
	absCoverFilePath, err := filepath.Abs(coverFilePath)
	if err != nil {
		return nil, fmt.Errorf("could not get absolute path of cover file `%s`: %s", coverFilePath, err)
	}

	parser := &parser{
		coverFilePath: absCoverFilePath,
	}

	return parser, cover.HtmlOutput(absCoverFilePath, outFilePath)
}
