FROM node:latest

# Create app directory
WORKDIR /usr/src/DataIntFeedMgntBackend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm","start"]


