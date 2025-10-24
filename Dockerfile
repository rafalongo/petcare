FROM node:18

WORKDIR /usr/src/app

COPY package*.json tsconfig.json ./

RUN npm install

COPY ./src ./src

CMD ["npm", "run", "dev"]
