# Docker Overlay Network

A **Overlay Network** is a virtual network that sits on top of(overlays) the existing physical/underlay network infrastructure. In Docker, it enables containers running on different docker hosts to communicate with each other as if they were on the same local network. 

--- 
# Prerequisites for Overlay Network

| Requirement | Details |
| :--- | :--- |
| **Docker Engine Mode** | Swarm mode must be enabled (`docker swarm init` or `docker swarm join`). |
| **Key-Value Store** | Uses Swarm's built-in Raft consensus (no external store like Consul or etcd required). |
| **Network Ports** | • **TCP 2377**: Cluster management communication<br>• **TCP/UDP 7946**: Node-to-node communication (gossip protocol)<br>• **UDP 4789**: Overlay network traffic (VXLAN) |
| **Host Configuration** | Every host in the cluster must have a unique hostname. |

---

## 🚀 Key Concepts

### 1. VXLAN Encapsulation
* Under the hood, Docker uses VXLAN (Virtual Extensible LAN) technology (UDP port 4789).

### 2. Docker Swarm Integration
* Overlay networks rely on Docker Swarm control plane for state management and peer discovery.
* Even if you just want to run standalone containers across multiple hosts, the hosts must join the same Swarm cluster.

### 3. Built-in DNS & Service Discovery
* Docker automatically runs an embedded DNS Server inside each container.
* Containers connected to the same overlay network can rech each other simply by using container name or Swarm service name

### 4. Automatic Routing Mesh
* In a swarm cluster, the ingress overlay newtork routes requests coming to a published port on any node to an active 
  instance of that service running on any node, balancing traffic automatically.

# Notes
* For overlay networks and Swarm to  function across hosts, your host firewalls must allow these ports:
* TCP 2377: Cluster management communications.
* TCP/UDP 7946: Container network discovery (control plane).
* UDP 4789: VXLAN data plane traffic
* IP Protocol 50 (ESP): Required if using --opt encrypted traffic