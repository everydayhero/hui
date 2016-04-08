FROM node:5.8.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json /usr/src/app/
RUN npm install

ADD . /usr/src/app

CMD "bin/bash"
