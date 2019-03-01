## Project Description
This project is an illustration of an end to end solution for developing a Feed Management system with Data ingestion(RSS Feeds) into database and display of the same in a UI.

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
Install nodejs, react , Dockers, typescript and couchbase

droneBackend serves as the backend server whereas droneclient serves as the frontend representing drones movement

## Please install couchbase latest version locally with following credentials
```
username - 'Administrator'
password - 'root123'

please create bucket "default" in the couchbase

Couchbase is used for storing all the drones and updating their movements using websockets
```

## INSTRUCTIONS FOR RUNNING BACKEND

within droneBackend there is a dockerfile please build docker image and run the same

```
cd droneBackend
docker build -t anjali/dronebackend .
docker run -p 4001:4001 anjali/dronebackend 
```

Without Docker backend can be also be run using following commands

```
npm install
npm run start-dev // For running typescript files locally
or
npm run build // This will convert tsc to javascript into dist/ folder 
```


## INSTRUCTIONS FOR RUNNING FRONTEND

within droneclient there is a dockerfile please build docker image via following command
```
cd droneclient
docker build -t anjali/droneclient .
docker run -p 3000:3000 anjali/droneclient 
```


Without Docker, backend be also be run using following commands
```
npm install
npm run start  
```


## Please refer attached screen shot taken locally to illustrate what has been done

## Area of Improvements
Due to time constraint , many things are kept static like port number, couchbase configuration which can be made modular and which can be fetched from configuration file

Not all test cases are covered

