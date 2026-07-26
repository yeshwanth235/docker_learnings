# To Run Overlay Network

cd ./networking/overlay-network

### Generate Docker images
docker build -t api-service ./api-service
docker build -t worker-service ./worker-service

### Initate Docker swarm
docker swarm init

verify swarm is active
docker info | grep Swarm

### create overlay network 
docker network create \
--driver overlay \
--attachable \
swarm-network

#### Note
--driver overlay -> multi-host network
--attachable -> allows standalone containers to attach (not just swarm services)

### Deploy as Docker Swarm services

docker service create \
--name worker-service \
--network swarm-network \
--replicas 1 \
worker-service

docker service create \
--name api-service \
--network swarm-network \
--replicas 1 \
--publish 3000:3000 \
api-service

#### Note
* worker-service has NO Port published -- internal only
* api-service published port 3000 to the host 
* Both are no swarm-network

### Testing
curl localhost:4040

### If using EC2
* Enabled 0.0.0.0/0 TCP in Inbound rules for respective security group mapped to EC2 instance
* curl http://127.0.0.1

### Cleanup
* Remove running services -> 
docker service rm api-service worker-service

* Remove the overlay network -> 
docker network rm swarm-network

* Leave the Swarm cluster -> 
docker swarm leave --force

* Remove built Docker images -> 
docker rmi api-service worker-service