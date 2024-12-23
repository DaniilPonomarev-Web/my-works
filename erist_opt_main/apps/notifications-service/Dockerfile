FROM node:22.2.0-alpine AS base

FROM base AS builder
WORKDIR /app

COPY --from=erist_opt-image:deps /app/node_modules ./node_modules
COPY . .

RUN yarn nx build notifications-service


FROM base AS runner
WORKDIR /app

COPY --from=builder /app/dist/apps/notifications-service/ .
COPY --from=builder /app/ormconfig.js .
# COPY --from=builder /app/rsa-keys ./rsa-keys
# RUN chmod -R 777 ./rsa-keys && chown -R node:node ./rsa-keys

# RUN --mount=type=cache,target=/usr/local/share/.cache yarn install
COPY --from=erist_opt-image:deps /app/node_modules ./node_modules

RUN yarn cache clean

CMD ["node", "main.js"]
