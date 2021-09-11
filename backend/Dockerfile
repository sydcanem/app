FROM node:14-alpine
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . /usr/src/app/

ENV NODE_ENV development
EXPOSE 4000

CMD ["yarn", "start"]
