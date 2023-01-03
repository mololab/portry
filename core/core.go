package core

import (
	"fmt"
	"sort"
	"sync"

	"github.com/mololab/portry/netstat"
)

type ByPort []netstat.SockTabEntry

type SocketFunction struct {
	socketType string
	function   func(netstat.AcceptFn) ([]netstat.SockTabEntry, error)
}

var SocketFunctions []SocketFunction = []SocketFunction{
	{
		socketType: "UDP",
		function:   netstat.UDPSocks,
	},
	{
		socketType: "UDP6",
		function:   netstat.UDP6Socks,
	},
	{
		socketType: "TCP",
		function:   netstat.TCPSocks,
	},
	{
		socketType: "TCP6",
		function:   netstat.TCP6Socks,
	},
}

var Socks []netstat.SockTabEntry = []netstat.SockTabEntry{}
var mutex sync.Mutex = sync.Mutex{}

// fetchSocks get port information for provided socket type
func fetchSocks(wg *sync.WaitGroup, socketType string, fetcher func(accept netstat.AcceptFn) ([]netstat.SockTabEntry, error)) {
	defer wg.Done()

	socks, err := fetcher(netstat.NoopFilter)

	if err != nil {
		handleError(err)
		return
	}

	for index := range socks {
		socks[index].SocketType = socketType
	}

	fillSocks(socks)
}

// GetSocks returns all type socket`s port information
func GetSocks() []netstat.SockTabEntry {
	var wg sync.WaitGroup

	wg.Add(4)

	for _, socketFunction := range SocketFunctions {
		go fetchSocks(&wg, socketFunction.socketType, socketFunction.function)
	}

	wg.Wait()

	SortByPorts()

	return Socks
}

// handleError handles error
func handleError(err error) {
	fmt.Println("ERROR", err)
}

// fillSocks safely push provided socket information to general slice
func fillSocks(socks []netstat.SockTabEntry) {
	mutex.Lock()
	Socks = append(Socks, socks...)
	mutex.Unlock()
}

// Sort sockets by Port number
func SortByPorts() {
	sort.Sort(ByPort(Socks))
}

func (a ByPort) Len() int {
	return len(a)
}

func (a ByPort) Less(i, j int) bool {
	return a[i].LocalAddr.Port < a[j].LocalAddr.Port
}

func (a ByPort) Swap(i, j int) {
	a[i], a[j] = a[j], a[i]
}
