## Start the app

## FRONT

Перед локальным запуском проекта:

- запросить локальные env, создать файл .env и скопировать их в этот файл
- установить все зависимости: yarn
- сбилдить необходимые backend-сервисы: docker-compose up --build -d
- запустить backend: yarn start:backend
- запустить RMQ-микросервис - yarn start:rmq
- сгенерировать graphQL хуки (см. GraphQL codegen ниже)
- запустить фронт: yarn start:frontend

# GraphQL codegen

- Запуск генерации происходит с помощью команды yarn codegen (backend должен быть запущен)
- Новые запросы располагать apps/frontend/graphql
- После создания нового .gql запроса необходимо прогнать еще раз генерацию

ВАЖНО!

- При локальной генерации в codegen расположение схемы:
  schema: 'http://localhost:3010/graphQl'
- При создании merge request для пуша в ветку frontend необходимо менять расположение схемы:
  schema: './graphql.schema.json'

# Генерация svg-компонентов

- Располагаем нужные иконки в public/svg/origin (название kebab-case)
- Генерируем компоненты: yarn svg:transform
- Импортируем как компонент и пользуемся

## GRAPHDOC

Generate documentation from live endpoint:

- graphdoc -e http://localhost:3010/graphql -o ./doc/schema
- yarn graphdoc -e http://localhost:3010/graphql -o ./doc/schema --force

Generate documentation from IDL file

- graphdoc -s ./schema.gql -o ./doc/schema

## COMPODOC

- Генерация статики
  yarn compodoc -p tsconfig.compodoc.json --watch
- Запуск на порту
  yarn compodoc src -s -r 8081

## Generate JWT Access Token keypairs

mkdir rsa-keys
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
cat jwtRS256.key
cat jwtRS256.key.pub
mv -v jwtRS256.key access-token-private-key.key
mv -v jwtRS256.key.pub access-token-public-key.pub
clear

## shadcn-ui

- генерация компонента: `npx shadcn-ui@latest add button`

## DEPLOY ON QA AND DOCKER

yarn
зпросить env
docker build . -t erist_opt-image:nx-base
docker compose -f docker-compose.qa.yml up --build -d

///
docker build -f Dockerfile.base -t erist_opt-image:nx-base .
docker build -f Dockerfile.deps -t erist_opt-image:deps .
docker compose -f docker-compose.qa.yml up api --build -d --no-deps
docker compose -f docker-compose.qa.yml up data-loader --build -d --no-deps
docker compose -f docker-compose.qa.yml up notifications-service --build -d --no-deps
docker compose -f docker-compose.qa.yml up local-rmq --build -d --no-deps
docker compose -f docker-compose.qa.yml up front --build -d --no-deps
docker compose -f docker-compose.qa.yml up admin --build -d --no-deps

# Пакетный кэш https://verdaccio.org/docs/docker/

docker pull verdaccio/verdaccio:4
docker run -d --name verdaccio -p 4873:4873 verdaccio/verdaccio
