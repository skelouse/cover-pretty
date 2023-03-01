package parse

import (
	"fmt"
	"os"
	"path/filepath"
	"testing"

	"gotest.tools/v3/assert"
)

func TestDiscover(t *testing.T) {
	testDirSuccess := "./success/t1/t2"
	err := os.MkdirAll(testDirSuccess, 0755)
	assert.NilError(t, err)

	err = os.WriteFile(filepath.Join(testDirSuccess, "cover.out"), []byte("Hello"), 0755)
	assert.NilError(t, err)

	path, err := Discover()
	assert.NilError(t, err)
	assert.Equal(t, path, "success/t1/t2/cover.out")

	// Clean up success directory
	err = os.RemoveAll("./success")
	assert.NilError(t, err)

	testDirOutOfDepth := "./failure"
	for i := 0; i < maxRecurse+1; i++ {
		testDirOutOfDepth = filepath.Join(testDirOutOfDepth, fmt.Sprintf("t%d", i))
	}

	err = os.MkdirAll(testDirOutOfDepth, 0755)
	assert.NilError(t, err)

	err = os.WriteFile(filepath.Join(testDirOutOfDepth, "cover.out"), []byte("Hello"), 0755)
	assert.NilError(t, err)

	path, _ = Discover()
	assert.Equal(t, path, "")
	assert.NilError(t, err)

	err = os.RemoveAll("./failure")
	assert.NilError(t, err)
}
