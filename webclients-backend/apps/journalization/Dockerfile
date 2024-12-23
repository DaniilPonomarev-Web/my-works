FROM node:22.9.0-alpine AS base

FROM base AS builder

WORKDIR /app

COPY --from=wcb-image:deps /app/node_modules ./node_modules
COPY . .

RUN yarn nx build journalization

FROM base AS runner

WORKDIR /app

COPY --from=builder /app/dist/apps/journalization/ .   
COPY --from=builder /app/ormconfig.js .
COPY --from=wcb-image:deps /app/node_modules ./node_modules

CMD ["node", "main.js"] 
