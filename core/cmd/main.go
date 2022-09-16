package main

import (
	"fmt"

	// "github.com/mololab/portry/netstat"
	"github.com/mozilla/mig/modules/netstat"
)

func displaySocks() error {

	/*

		for _, e := range socks {
			_ = e
			fmt.Printf("cc-> %v %v\n", e.LocalAddr.Port, e.Process.String())
		}
			// TCP sockets
			socks, err := netstat.TCPSocks(netstat.NoopFilter)
			if err != nil {
				return err
			}
			fmt.Println(`2 - socks`, len(socks))
	*/
	/*
			// UDP sockets
			socks, err := netstat.UDPSocks(netstat.NoopFilter)
			if err != nil {
				return err
			}

			fmt.Println(`1 - socks`, len(socks))
			/*
				for _, e := range socks {
					fmt.Printf("cc-> %v %v\n", e.LocalAddr.Port, e.Process.String())
				}

		for _, e := range socks {

			if e.Process != nil {
				fmt.Printf("bb-> -> %v %v %v\n", e.LocalAddr.Port, e.Process.Pid, e.Process.Name)
			}

		}
			// TCP sockets
			socks, err = netstat.TCPSocks(netstat.NoopFilter)
			if err != nil {
				return err
			}
			fmt.Println(`2 - socks`, len(socks))

			/*
				for _, e := range socks {
					fmt.Printf("bb-> %v\n", e.LocalAddr.Port)
				}
	*/

	/*

		// get only listening TCP sockets
		tabs, err := netstat.TCPSocks(func(s *netstat.SockTabEntry) bool {
			return s.State == netstat.Listen
		})
		if err != nil {
			return err
		}
		fmt.Println(`3 - tabs`, len(tabs))
		/*
			for _, e := range tabs {
				fmt.Printf("aa-> %v %v\n", e.LocalAddr.Port, e.Process.Pid)
			}
	*/

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

func main() {
	// fmt.Println("Welcome to portry")

	// netstat.Scan()

	// fmt.Println("done")

	err := displaySocks()

	if err != nil {
		fmt.Println("ERROR: ", err)
	}

	found, elements, err2 := netstat.HasSeenIP("127.0.0.1")

	fmt.Println(found, elements, err2)

}
