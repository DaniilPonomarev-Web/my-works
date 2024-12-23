## Start the app

## GRAPHDOC

Generate documentation from live endpoint:

- graphdoc -e http://localhost:3010/graphql -o ./doc/schema
- yarn graphdoc -e http://localhost:3010/graphql -o ./doc/schema --force

Generate documentation from IDL file

- graphdoc -s ./schema.gql -o ./doc/schema --force

## COMPODOC

- Генерация статики
  yarn compodoc -p tsconfig.compodoc.json --watch
- Запуск на порту
  yarn compodoc src -s -r 8085

## DEPLOY

yarn
зпросить env
docker build -f Dockerfile.base -t wcb-image:nx-base .
docker build -f Dockerfile.deps -t wcb-image:deps .
docker compose -f docker-compose.qa.yml up --build -d

# один образ

docker compose -f docker-compose.qa.yml up <Название приложения из d-c.qa.yml> --build -d --no-deps

# Пакетный кэш https://verdaccio.org/docs/docker/

docker pull verdaccio/verdaccio:4
docker run -d --name verdaccio -p 4873:4873 verdaccio/verdaccio

## Local run

yarn
зпросить env
docker build -f Dockerfile.base -t wcb-image:nx-base .
docker build -f Dockerfile.deps -t wcb-image:deps .
docker compose -f docker-compose.local.yml up --build -d
yarn nx serve journalization
yarn nx serve data-loader
yarn nx serve graphql

## Jest

yarn jest
yarn nx test apime-integration
yarn nx test search-clients
