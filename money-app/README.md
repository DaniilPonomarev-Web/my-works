# MoneyApp smartfinbot.ru

nx nest telegraf angulal 18

# build for stage

yarn
docker build . -t money-base-image:nx-base
docker compose -f docker-compose.qa.yml up --build -d

## ANGULAR MINI-WEB

1. Переменные находятся в файле apps\mini-web\src\environments\environment.ts
2. Конфигурация подмены находится здесь - apps\mini-web\project.json
3. DEV - yarn nx build mini-web --configuration=development, PROD - yarn nx build mini-web --configuration=production

## FIREBASE

1. Зарегаться там
2. yarn global add firebase-tools
3. firebase login
4. firebase init и выбрать хостинг первый и то что уже готовое приложение.
5. firebase deploy
