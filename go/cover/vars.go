package cover

import (
	_ "embed"
	"errors"
	"html/template"
	"strings"
)

//go:embed index.html
var indexHTML string

//go:embed style.css
var styleCSS string

func style() template.HTML {
	return template.HTML("<style>" + styleCSS + colors() + "</style>")
}

var indent = 4

var htmlTemplate = template.Must(template.New("html").Funcs(template.FuncMap{
	"style": style,

	// https://stackoverflow.com/questions/18276173/calling-a-template-with-several-pipeline-parameters
	"dict": func(values ...interface{}) (map[string]interface{}, error) {
		if len(values)%2 != 0 {
			return nil, errors.New("invalid dict call")
		}
		dict := make(map[string]interface{}, len(values)/2)
		for i := 0; i < len(values); i += 2 {
			key, ok := values[i].(string)
			if !ok {
				return nil, errors.New("dict keys must be strings")
			}
			dict[key] = values[i+1]
		}

		if _, ok := dict["Inner"]; ok {
			dict["Key"] = strings.Repeat("‎ ", dict["Value"].(*templateFile).Indent) + dict["Key"].(string)
		}

		return dict, nil
	},
}).Parse(indexHTML))
