gql:
	yarn nx serve graphql
dl:
	yarn nx serve data-loader
jz:
	yarn nx serve journalization
all:
	yarn nx run-many --target=serve --projects=graphql, data-loader --parallel

kill:
	@PORT=3010; \
	PIDS=`lsof -t -i:$$PORT`; \
	if [ -n "$$PIDS" ]; then \
			echo "Убили процесс $$PIDS с портом $$PORT"; \
			kill $$PIDS; \
	else \
			echo "Нет процессов на порту: $$PORT"; \
	fi
	
dc: 
	docker compose up --build -d
	
build: 
	docker build -f Dockerfile.base -t wcb-image:nx-base .
	docker build -f Dockerfile.deps -t wcb-image:deps .
	docker compose -f docker-compose.qa.yml up --build -d

compodoc-build:
	yarn compodoc -p tsconfig.compodoc.json --watch

compodoc-start:
	yarn compodoc src -s -r 8085

graphdoc-build: 
	yarn graphdoc -e http://localhost:3010/graphql -o ./doc/schema --force


