FROM node:alpine
RUN apk add --no-cache python g++ make
WORKDIR /usr/app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]