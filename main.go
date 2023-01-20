package main

import (
	"fmt"
	"log"
	"os"

	"github.com/skelouse/cover-pretty/go/cover"
	"github.com/skelouse/cover-pretty/parse"
	"github.com/urfave/cli/v3"
)

var (
	htmlFlag = &cli.BoolFlag{
		Name: "html",
	}
	funcFlag = &cli.BoolFlag{
		Name: "func",
	}
	outFlag = &cli.StringFlag{
		Name:    "out",
		Aliases: []string{"o"},
		Usage:   "path to output file",
	}
)

func action(ctx *cli.Context) (err error) {

	var in string
	if ctx.Args().Len() > 0 {
		in = ctx.Args().Get(0)
	} else {
		in, err = parse.Discover()
		if err != nil {
			return fmt.Errorf("finding `cover.out` failed with: %s", err)
		}
	}

	out := ctx.String(outFlag.Name)

	doHTML := ctx.IsSet(htmlFlag.Name)
	doFunc := ctx.IsSet(funcFlag.Name)

	// Default
	if doHTML || !doHTML && !doFunc {
		err = cover.HtmlOutput(in, out)
		if err != nil {
			return err
		}
	}

	if doFunc {
		err = cover.FuncOutput(in, out)
		if err != nil {
			return err
		}
	}

	return nil
}

func main() {
	app := &cli.App{
		Flags:  []cli.Flag{htmlFlag, funcFlag, outFlag},
		Action: action,
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}
