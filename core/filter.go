package core

import "github.com/mololab/portry/netstat"

// FilterSocks filters sockets by start and end ports
func FilterSocks(socks []netstat.SockTabEntry, startPort, endPort int) []netstat.SockTabEntry {

	if startPort > endPort {
		return []netstat.SockTabEntry{}
	}

	var filteredSocks []netstat.SockTabEntry = []netstat.SockTabEntry{}

	for _, sock := range socks {
		if startPort <= int(sock.LocalAddr.Port) && int(sock.LocalAddr.Port) <= endPort {
			filteredSocks = append(filteredSocks, sock)
		}
	}

	return filteredSocks
}
