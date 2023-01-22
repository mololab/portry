go:
	go run main.go

run: 
	wails dev

build:
	wails build

build-nsis:
	wails build -nsis

.PHONY: run build go build-nsis