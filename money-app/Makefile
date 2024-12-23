# Services
all:
	yarn nx run-many --target=serve --projects=bot,data-loader  --parallel
bot:
	yarn nx serve bot
dl:
	yarn nx serve data-loader
ma:
	yarn nx serve money-app
#frontend
ng:
	yarn nx serve mini-web

# Docker
up:
	docker-compose up -d
build:
	docker-compose up --build -d
down:
	docker-compose down
base-image:
	docker build . -t money-base-image:nx-base
	
# File system
clear:
	sudo rm -fr docker-data

