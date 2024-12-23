FROM node:22.9.0 as builder
ARG NODE_ENV
ARG BUILD_FLAG

WORKDIR /app/builder
COPY . .
USER root
RUN yarn install