FROM node:16.14


WORKDIR /autoconsciencia/

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./dist/ ./dist/

run npm i

EXPOSE 3000

cmd npm start
