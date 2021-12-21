FROM node@sha256:36aca218a5eb57cb23bc790a030591382c7664c15a384e2ddc2075761ac7e701

ENV APP_PATH /opt/0311-040-script

RUN mkdir -p $APP_PATH
WORKDIR $APP_PATH

ADD migration.js $APP_PATH
ADD package.json $APP_PATH

RUN npm install

ENTRYPOINT node migration.js
