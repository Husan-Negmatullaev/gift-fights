FROM node:22.16.0

WORKDIR /usr/src/app

COPY . .

RUN npm ci --build-from-source && npm run build 
