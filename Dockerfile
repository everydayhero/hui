FROM node:8.11.4

RUN npm install -g yarn@1.9.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json yarn.lock /usr/src/app/
RUN yarn
RUN yarn add react@^15.6.2 react-dom@^15.6.2

ADD . /usr/src/app

CMD "bin/bash"
