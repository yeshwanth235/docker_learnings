# Docker Host Network

The **Host Network** driver removes network isolation between a Docker container and its host machine. This allows the container to directly share the host's network stack, interfaces, IP addresses, and port ranges.

---

## Advantages

* **Maximum Performance:** Removes Network Address Translation (NAT) and virtual routing overhead. Network performance is as fast as bare-metal.
* **Simpler Port Management:** Eliminates the need to manage complex port forwarding (`-p` or `--publish`) or expose large ranges of ports manually.
* **Great for Broadcasts:** Ideal for protocols that rely on network broadcasting or multicasting (e.g., DHCP, MDNS).

---

## Disadvantages

* **No Port Isolation:** Since containers share the host's space, you cannot run two containers that bind to the same port simultaneously.
* **Security Risks:** The container has full access to the host's network stack, increasing the blast radius if a container is compromised.
* **No Container Namespaces:** You lose the ability to use Docker's built-in DNS service discovery (`--link` or custom bridge networks) between containers.

---

## When Should You Use It?

You should consider using host networking in a few specific scenarios:

### 1. High-Throughput Applications
If you are running ultra-low latency services or applications moving massive amounts of data (e.g., high-volume databases, live video streaming).

### 2. Handling Massive Port Ranges
If your application requires opening hundreds of random ports dynamically (like a WebRTC or VoIP media server), mapping them individually with standard bridge mode would exhaust system resources.

### 3. IoT and Network Discovery
If your container needs to scan the local physical network, discover smart home devices, or handle native routing tasks.

---

> [!WARNING]
> **Platform Limitation:** Host networking only works natively on **Linux** hosts. On Docker for Mac or Docker for Windows, containers run inside a lightweight virtual machine. This means the container will share the network stack of that hidden VM, not your actual Mac or Windows host machine.