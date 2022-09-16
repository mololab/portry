package netstat

import (
	"flag"
	"fmt"
	"net"
	"sync"
	"time"
)

func Scan() {
	hostname := flag.String("hostname", "192.168.1.1", "hostname to test")
	ports := []int{}
	wg := &sync.WaitGroup{}
	mutex := &sync.Mutex{}
	timeout := time.Millisecond * 6000
	for port := 1; port < 65000; port++ {
		wg.Add(1)
		go func(p int) {
			opened := ScanIt(*hostname, p, timeout)
			if opened == true {
				mutex.Lock()
				ports = append(ports, p)
				mutex.Unlock()
			}
			wg.Done()
		}(port)
	}
	wg.Wait()
	fmt.Printf("Opened Ports: %v\n", ports)
}

func ScanIt(host string, port int, timeout time.Duration) bool {
	conn, err := net.DialTimeout("tcp", fmt.Sprintf("%s:%d", host, port), timeout)
	if err == nil {
		_ = conn.Close()
		return true
	}
	return false
}
