
FROM node:22.2.0-alpine AS base

FROM base AS builder

WORKDIR /app

COPY --from=erist_opt-image:deps /app/node_modules ./node_modules
COPY . .

RUN yarn nx build data-loader

FROM base AS runner

WORKDIR /app

COPY --from=builder /app/dist/apps/data-loader/ .

RUN --mount=type=cache,target=/usr/local/share/.cache yarn install
RUN yarn cache clean

CMD ["node", "main.js"] 
