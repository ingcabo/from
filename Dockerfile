FROM node:8.10.0

RUN mkdir /admin
WORKDIR /admin

ENV NPM_CONFIG_LOGLEVEL warn

COPY . .

RUN yarn install

CMD yarn start
EXPOSE 8080

