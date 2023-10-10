FROM node:16.13.0 as builder
WORKDIR /app
COPY ./package*.json /app/
ADD . /app
RUN npm install
RUN npm run build
