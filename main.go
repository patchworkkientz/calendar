package main

import (
	"net/http"
	"html/template"
)

var tpl *template.Template

func init() {
	tpl = template.Must(template.ParseGlob("template/*"))
	http.Handle("/assets/", http.StripPrefix("/assets", http.FileServer(http.Dir("./public"))))
	http.HandleFunc("/", index)
	http.ListenAndServe("8080", nil)
}
func index(w http.ResponseWriter, r *http.Request) {
	tpl.ExecuteTemplate(w, "calendar.htm", r)
}