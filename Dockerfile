FROM node:8.11.4

RUN npm install -g yarn@1.9.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json yarn.lock /usr/src/app/
RUN yarn

ADD . /usr/src/app

CMD "bin/bash"
