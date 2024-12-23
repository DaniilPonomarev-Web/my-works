front:
	yarn nx dev front
adm:
	yarn nx serve admin
codegen: 
	yarn graphql-codegen --config codegen.ts
api:
	yarn nx serve api
lrmq: 
	yarn nx serve local-rmq
dl:
	yarn nx serve data-loader
ntf: 
	yarn nx serve notifications-service
all:
	yarn nx run-many --target=serve --projects=api, data-loader --parallel

kill:
	@PORT=3010; \
	PIDS=`lsof -t -i:$$PORT`; \
	if [ -n "$$PIDS" ]; then \
			echo "Убили процесс $$PIDS с портом $$PORT"; \
			kill $$PIDS; \
	else \
			echo "Нет процессов на порту: $$PORT"; \
	fi


compodoc-build:
	yarn compodoc -p tsconfig.compodoc.json --watch

compodoc-start:
	yarn compodoc src -s -r 8085

graphdoc-build: 
	yarn graphdoc -e http://localhost:3010/graphql -o ./doc/schema --force

dc: 
	docker compose up --build -d
