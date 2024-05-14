FROM node:18.18.2

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 42069

EXPOSE 42070


CMD ["npm", "start"]