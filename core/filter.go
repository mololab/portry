package core

// FilterSocks filters sockets by start and end ports
func FilterSocks(socks []Socket, startPort, endPort int) []Socket {

	filteredByPortInterval := filterByPortInterval(socks, startPort, endPort)

	filteredBySameSocks := filterBySameSocks(filteredByPortInterval)

	return filteredBySameSocks
}

func filterByPortInterval(socks []Socket, startPort, endPort int) []Socket {
	if startPort > endPort {
		return []Socket{}
	}

	var filteredSocks []Socket = []Socket{}

	for _, sock := range socks {
		if startPort <= int(sock.Port) && int(sock.Port) <= endPort {
			filteredSocks = append(filteredSocks, sock)
		}
	}

	return filteredSocks
}

func filterBySameSocks(socks []Socket) []Socket {
	var filteredSocks []Socket = []Socket{}

	for i := range socks {

		if i != 0 {
			if socks[i-1].Port != socks[i].Port ||
				socks[i-1].ProcessID != socks[i].ProcessID ||
				socks[i-1].ProcessName != socks[i].ProcessName ||
				socks[i-1].SocketType != socks[i].SocketType {
				filteredSocks = append(filteredSocks, socks[i])
			}
		} else {
			filteredSocks = append(filteredSocks, socks[i])
		}
	}

	return filteredSocks
}
