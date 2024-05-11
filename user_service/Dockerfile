FROM node:21
WORKDIR /user_service
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
CMD [ "npm","start" ]