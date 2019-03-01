## Project Description
This project is an illustration of an end to end solution for developing a Feed Management system with Data ingestion (RSS Feeds) into a scalable database with display of the same in a UI.

The project is developed using following technologies
```
Nodejs 
Typescript, Javascript 
Unit Testing and Test coverage using mocha, chai, sinon, nyc
React
Redis
Nginx
Docker, Docker-compose
```

### Prerequisites
Install Docker and Docker-compose in your system (This is really fantastic because docker-compose will build and up all the required services)

https://docs.docker.com/install/

https://docs.docker.com/compose/install/

Without Docker and Docker-compose, the system can also be run by installing above mentioned techstack individually

## Instructions for running the system using Docker and Docker-compose 
```
cd DataIntegrationAndFeedManagement
sudo docker-compose up // This will build/pull images of backend, forntend, redis and nginx as components of the system services
```

## Instructions for running the system without Docker and Docker-compose

Copy/Configure nginx.conf from nginxConf/nginx.conf into /etc/nginx/conf/nginx.conf

```
service nginx start 

Nginx will run default at port 80
```

Start Backend server as follows

```
cd backend
npm install
npm run test
npm run start-dev // For running typescript files locally
or
npm run build // This will convert tsc to javascript into dist/ folder 

This should make your server running in port 4000
```

Start Frontend server as follows
```
cd frontend
npm install
npm run start

This should make your server running in port 3000
```
