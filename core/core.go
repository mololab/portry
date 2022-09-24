package core

import (
	"fmt"

	"github.com/mololab/portry/netstat"
)

func displaySocks() error {

	fmt.Println("1")

	// 1 - UDP sockets
	socks, err := netstat.UDPSocks(netstat.NoopFilter)
	if err != nil {
		return err
	}

	fmt.Println(`1 - socks`, len(socks))

	for _, e := range socks {
		_ = e
		fmt.Printf("cc-> %v %v\n", e.LocalAddr.Port, e.Process.String())
	}

	// 2 - TCP sockets
	socks, err = netstat.TCPSocks(netstat.NoopFilter)
	if err != nil {
		return err
	}
	fmt.Println(`2 - socks`, len(socks))

	for _, e := range socks {

		if e.Process != nil {
			fmt.Printf("bb-> -> %v %v %v\n", e.LocalAddr.Port, e.Process.Pid, e.Process.Name)
		}

	}

	// get only listening TCP sockets
	tabs, err := netstat.TCPSocks(func(s *netstat.SockTabEntry) bool {
		return s.State == netstat.Listen
	})
	if err != nil {
		return err
	}
	fmt.Println(`3 - tabs`, len(tabs))

	for _, e := range tabs {
		fmt.Printf("aa-> %v %v\n", e.LocalAddr.Port, e.Process.Pid)
	}

	/*
		// list all the TCP sockets in state FIN_WAIT_1 for your HTTP server
		tabs, err = netstat.TCPSocks(func(s *netstat.SockTabEntry) bool {
			return s.State == netstat.FinWait1 && s.LocalAddr.Port == 80
		})
		// error handling, etc.

		fmt.Println(`4 - tabs`, len(tabs))
	*/
	return nil
}

func Ports() {
	err := displaySocks()

	if err != nil {
		fmt.Println("ERROR: ", err)
	}

}
