FROM node:22.2.0-alpine AS base


FROM base AS builder

ARG API_ENDPOINT
ENV API_ENDPOINT=${API_ENDPOINT}
ARG API_ENDPOINT
ENV API_ENDPOINT=${API_ENDPOINT}
ARG MONGODB_URI
ENV MONGODB_URI=${MONGODB_URI}
ENV NODE_ENV production

WORKDIR /app

COPY --from=erist_opt-image:deps /app/node_modules ./node_modules
COPY . .

RUN yarn nx build front --verbose


FROM base AS runner

WORKDIR /app

ARG AUTH_SECRET
ENV AUTH_SECRET ${AUTH_SECRET}
ARG API_ENDPOINT
ENV API_ENDPOINT=${API_ENDPOINT}
ARG MONGODB_URI
ENV MONGODB_URI=${MONGODB_URI}
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV AUTH_TRUST_HOST true

COPY --from=builder /app/dist/apps/front/ .

#RUN yarn config set network-timeout 600000

# RUN npm install    #yarn
RUN yarn install    #yarn

CMD yarn start
