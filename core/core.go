package core

import (
	"fmt"

	"github.com/mololab/portry/netstat"
)

var Socks []netstat.SockTabEntry = []netstat.SockTabEntry{}

// getUDPSocks returns UDP sockets
func getUDPSocks() (socks []netstat.SockTabEntry) {
	socks, err := netstat.UDPSocks(netstat.NoopFilter)

	if err != nil {
		handleError(err)
		return []netstat.SockTabEntry{}
	}

	return
}

// getUDP6Socks returns UDP6 sockets
func getUDP6Socks() (socks []netstat.SockTabEntry) {
	socks, err := netstat.UDP6Socks(netstat.NoopFilter)

	if err != nil {
		handleError(err)
		return []netstat.SockTabEntry{}
	}

	return
}

// getTCPSocks returns TCP Socks
func getTCPSocks() (socks []netstat.SockTabEntry) {
	socks, err := netstat.TCPSocks(netstat.NoopFilter)

	if err != nil {
		handleError(err)
		return []netstat.SockTabEntry{}
	}

	return
}

// getTCP6Socks returns TCP6 Socks
func getTCP6Socks() (socks []netstat.SockTabEntry) {
	socks, err := netstat.TCP6Socks(netstat.NoopFilter)

	if err != nil {
		handleError(err)
		return []netstat.SockTabEntry{}
	}

	return
}

func GetSocks() {
	uDPSocks := getUDPSocks()
	uDP6Socks := getUDP6Socks()

	tcpSocks := getTCPSocks()
	tcp6Socks := getTCP6Socks()

	fmt.Println("uDPSocks", uDPSocks)
	fmt.Println("uDP6Socks", uDP6Socks)
	fmt.Println("tcpSocks", tcpSocks)
	fmt.Println("tcp6Socks", tcp6Socks)
}

// helper
func handleError(err error) {
	fmt.Println("ERROR", err)
}
