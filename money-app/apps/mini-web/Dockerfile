FROM money-base-image:nx-base AS builder
ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .

RUN npx nx build mini-web ${BUILD_FLAG}
FROM money-base-image:nx-base

USER root
WORKDIR /app
COPY  --from=builder /app/builder/dist/apps/mini-web ./
# EXPOSE 4200
# CMD ["yarn", "start"]