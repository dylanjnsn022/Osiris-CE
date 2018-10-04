package main

import (
    "net/http"
    "log"
    "github.com/gorilla/mux"
    "fmt"
    "time"
    "strings"
)

func YourHandler(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("PWNED!\n"))
    vars := mux.Vars(r)
    parsed := vars["url"]
    parsed = strings.Replace(parsed, "==", "  ",-1)
    parsed = strings.Replace(parsed, "https:/", "https://",-1)
    parsed = strings.Replace(parsed, "http:/", "http://",-1)
    if parsed == "cookie" {
    fmt.Println("####################################### COOKIE ##############################################")
    } else {
    fmt.Println(time.Now().Format(time.RFC850), r.RemoteAddr,parsed)
    }
}

func main() {
    r := mux.NewRouter()
    // Routes consist of a path and a handler function.
    r.HandleFunc("/{url:.*}", YourHandler)

    // Bind to a port and pass our router in
    log.Fatal(http.ListenAndServe(":8000", r))
}
