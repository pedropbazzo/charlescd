FROM node@sha256:36aca218a5eb57cb23bc790a030591382c7664c15a384e2ddc2075761ac7e701

ENV APP_PATH /opt/darwin-deploy

RUN apk upgrade --update-cache --available && \
    apk add openssl && \
    rm -rf /var/cache/apk/*

ARG HELM_VERSION=v3.5.1

RUN wget -q -O - https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | /bin/sh -s -- --version $HELM_VERSION

RUN helm version

RUN mkdir -p $APP_PATH
WORKDIR $APP_PATH
COPY . $APP_PATH

RUN npm ci
RUN npm run build

ENV NODE_OPTIONS --enable-source-maps

ENTRYPOINT node dist/main.js
