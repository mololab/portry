package core

import "github.com/mololab/portry/netstat"

type Socket struct {
	Port        int
	ProcessID   int
	ProcessName string
	SocketType  string
}

// Format formats netstat type to UI type
func Format(socks []netstat.SockTabEntry) []Socket {

	var sockets []Socket = []Socket{}

	for _, sock := range socks {
		port := 0
		processID := 0
		processName := ""

		if sock.LocalAddr != nil {
			port = int(sock.LocalAddr.Port)
		}

		if sock.Process != nil {
			processID = sock.Process.Pid
			processName = sock.Process.Name
		}

		socketType := sock.SocketType

		sockets = append(sockets, Socket{
			Port:        port,
			ProcessID:   processID,
			ProcessName: processName,
			SocketType:  socketType,
		})
	}

	return sockets
}
