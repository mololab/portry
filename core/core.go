package core

import (
	"fmt"
	"sync"

	"github.com/mololab/portry/netstat"
)

var Socks []netstat.SockTabEntry = []netstat.SockTabEntry{}
var mutex sync.Mutex = sync.Mutex{}

func fetchSocks(wg *sync.WaitGroup, fetcher func(accept netstat.AcceptFn) ([]netstat.SockTabEntry, error)) {
	defer wg.Done()

	socks, err := fetcher(netstat.NoopFilter)

	if err != nil {
		handleError(err)
		return
	}

	fillSocks(socks)
}

func GetSocks() []netstat.SockTabEntry {

	funcs := []func(netstat.AcceptFn) ([]netstat.SockTabEntry, error){
		netstat.UDPSocks,
		netstat.UDP6Socks,
		netstat.TCPSocks,
		netstat.TCP6Socks,
	}

	var wg sync.WaitGroup

	wg.Add(4)

	for _, socketFunction := range funcs {
		go fetchSocks(&wg, socketFunction)
	}

	wg.Wait()

	return Socks
}

// helper
func handleError(err error) {
	fmt.Println("ERROR", err)
}

func fillSocks(socks []netstat.SockTabEntry) {
	mutex.Lock()

	Socks = append(Socks, socks...)

	mutex.Unlock()
}
