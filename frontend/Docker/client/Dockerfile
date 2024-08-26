# syntax=docker/dockerfile:1

FROM node:20.17.0 AS base

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]