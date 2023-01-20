package cover

import (
	_ "embed"
	"html/template"
)

//go:embed index.html
var indexHTML string

//go:embed style.css
var styleCSS string

func style() template.HTML {
	return template.HTML("<style>" + styleCSS + colors() + "</style>")
}

var htmlTemplate = template.Must(template.New("html").Funcs(template.FuncMap{
	"style": style,
}).Parse(indexHTML))
