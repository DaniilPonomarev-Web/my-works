FROM node:22.9.0-alpine AS base

FROM base AS builder
WORKDIR /app

COPY --from=wcb-image:deps /app/node_modules ./node_modules
COPY . .

RUN yarn nx build graphql

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/dist/apps/graphql/ .
# COPY --from=builder /app/ormconfig.js .


COPY --from=wcb-image:deps /app/node_modules ./node_modules

CMD ["node", "main.js"]
