go:
	go run main.go

run: 
	wails dev

build:
	wails build

.PHONY: run build go