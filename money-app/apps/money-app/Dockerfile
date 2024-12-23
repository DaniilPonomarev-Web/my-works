FROM money-base-image:nx-base AS builder
ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .
RUN npx nx build money-app ${BUILD_FLAG}
FROM money-base-image:nx-base
WORKDIR /app
COPY --from=builder /app/builder ./
ENV NODE_ENV=$NODE_ENV
EXPOSE 3010
CMD ["node", "./dist/apps/money-app/main.js"]