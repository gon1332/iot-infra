FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .
RUN chmod +x ./scripts/wait-for

CMD [ "node", "index.js" ]
