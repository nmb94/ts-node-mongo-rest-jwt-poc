FROM node:14.15.1-alpine3.12
WORKDIR /usr/src/ts-node-mongod-rest-jwt-poc
COPY . .
RUN npm install --only=production
RUN npm run build
EXPOSE 4000
CMD [ "npm", "run", "start" ]