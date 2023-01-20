package parse

import (
	"os"
	"path/filepath"
)

// Discover will walk the current directory and sub-directories in search of `cover.out`
// Returns cover.out or an error if not found
func Discover() (coverFilePath string, err error) {
	return coverPath(".")
}

func coverPath(dir string) (coverFilePath string, err error) {
	files, err := os.ReadDir(dir)
	if err != nil {
		return "", err
	}

	for _, file := range files {
		if file.IsDir() {
			coverFilePath, err = coverPath(filepath.Join(dir, file.Name()))
			if coverFilePath != "" {
				return coverFilePath, err
			}

			continue
		}

		if file.Name() == "cover.out" {
			return filepath.Join(dir, file.Name()), nil
		}
	}

	return "", nil
}
