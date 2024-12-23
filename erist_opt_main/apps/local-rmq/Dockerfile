FROM node:22.2.0-alpine AS base

FROM base AS builder

WORKDIR /app

COPY --from=erist_opt-image:deps /app/node_modules ./node_modules
COPY . .

RUN yarn nx build local-rmq

FROM base AS runner

WORKDIR /app

COPY --from=builder /app/dist/apps/local-rmq/ .
COPY --from=builder /app/ormconfig.js .
# COPY --from=builder /app/rsa-keys ./rsa-keys

# RUN chmod -R 777 ./rsa-keys && chown -R node:node ./rsa-keys                                         

# RUN --mount=type=cache,target=/usr/local/share/.cache yarn install
# RUN yarn cache clean
COPY --from=erist_opt-image:deps /app/node_modules ./node_modules

CMD ["node", "main.js"] 
