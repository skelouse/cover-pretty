package parse

import (
	"errors"
	"os"
	"path/filepath"
)

const maxRecurse = 20

var recursionError = errors.New("max recursion depth reached")

// Discover will walk the current directory and sub-directories in search of `cover.out`
// Returns cover.out or an error if not found
func Discover() (coverFilePath string, err error) {
	return coverPath(".", 0)
}

func coverPath(dir string, counter int) (coverFilePath string, err error) {
	if counter > maxRecurse {
		return "", recursionError
	}

	files, err := os.ReadDir(dir)
	if err != nil {
		return "", err
	}

	for _, file := range files {
		if file.IsDir() {
			coverFilePath, err = coverPath(filepath.Join(dir, file.Name()), counter+1)
			if err != nil {
				if err == recursionError {
					continue
				}

				return "", err
			}

			if coverFilePath != "" {
				return coverFilePath, nil
			}

			continue
		}

		if file.Name() == "cover.out" {
			return filepath.Join(dir, file.Name()), nil
		}
	}

	return "", nil
}
