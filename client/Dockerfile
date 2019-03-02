FROM node:latest

# Create app directory
WORKDIR /usr/src/DataFeedMgntFE

COPY package*.json ./

RUN npm install -f

COPY . .

CMD ["npm","start"]


