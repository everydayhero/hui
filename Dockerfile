FROM node:6.0.0

RUN npm install -g yarn@0.16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json yarn.lock /usr/src/app/
RUN yarn

ADD . /usr/src/app

CMD "bin/bash"
