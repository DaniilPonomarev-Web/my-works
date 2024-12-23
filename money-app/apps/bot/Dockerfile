FROM money-base-image:nx-base AS builder
ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .
RUN npx nx build bot ${BUILD_FLAG}
# Установка часового пояса
RUN apt-get update && \
	apt-get install -y tzdata && \
	rm -rf /var/lib/apt/lists/* && \
	ln -sf /usr/share/zoneinfo/Europe/Moscow /etc/localtime && \
	dpkg-reconfigure -f noninteractive tzdata

FROM money-base-image:nx-base
WORKDIR /app
COPY --from=builder /app/builder ./
ENV NODE_ENV=$NODE_ENV
CMD ["node", "./dist/apps/bot/main.js"]