FROM node:latest

# Create app directory
WORKDIR /usr/src/DataIntFeedMgntBackend

COPY package*.json ./

COPY dockerentrypoint.sh ./

RUN npm install

COPY . .

EXPOSE 4000

ENTRYPOINT ["sh","./dockerentrypoint.sh"]
