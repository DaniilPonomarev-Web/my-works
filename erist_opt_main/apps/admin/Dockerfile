FROM node:22.2.0-alpine AS base
FROM base AS builder
ENV NODE_ENV production
WORKDIR /app
COPY --from=erist_opt-image:deps /app/node_modules ./node_modules
COPY . .
RUN yarn nx build admin --verbose
FROM base AS runner
WORKDIR /app
COPY --from=builder /app/dist/apps/admin/ .
COPY --from=builder /app/package.json /app/yarn.lock ./
RUN yarn install 

FROM nginx:alpine
COPY --from=builder /app/dist/apps/admin/ /usr/share/nginx/html
COPY --from=builder /app/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]