postgres-on-docker:
	docker run -d \
	--name twenty_pg \
	-e PGUSER_SUPERUSER=postgres \
	-e PGPASSWORD_SUPERUSER=postgres \
	-e ALLOW_NOSSL=true \
	-v twenty_db_data:/home/postgres/pgdata \
	-p 5432:5432 \
	twentycrm/twenty-postgres-spilo:latest
	@echo "Waiting for PostgreSQL to be ready..."
	@until docker exec twenty_pg psql -U postgres -d postgres \
		-c 'SELECT pg_is_in_recovery();' 2>/dev/null | grep -q 'f'; do \
		sleep 1; \
	done
	docker exec twenty_pg psql -U postgres -d postgres \
		-c "CREATE DATABASE \"default\" WITH OWNER postgres;" \
		-c "CREATE DATABASE \"test\" WITH OWNER postgres;"

redis-on-docker:
	docker run -d --name twenty_redis -p 6379:6379 redis/redis-stack-server:latest

postgres-redis-on-docker:
	cd packages/twenty-docker && \
		docker compose -f packages/twenty-docker/docker-compose.dev.yml up -d db redis
	@echo "Waiting for PostgreSQL to be ready..."
	@until docker exec twenty-db-1 psql -U postgres -d postgres \
		-c 'SELECT pg_is_in_recovery();' 2>/dev/null | grep -q 'f'; do \
		sleep 1; \
	done
	docker exec twenty-db-1 psql -U postgres -d postgres \
		-c "CREATE DATABASE \"default\" WITH OWNER postgres;" \
		-c "CREATE DATABASE \"test\" WITH OWNER postgres;"

init-and-migrate-db:
	make postgres-redis-on-docker
	npx nx database:init:prod twenty-server && \
	npx nx database:migrate:prod twenty-server

dcup:
	docker compose -f packages/twenty-docker/docker-compose.dev.yml up --build

	docker compose -f packages/twenty-docker/docker-compose.yml build
build:

	docker compose -f packages/twenty-docker/docker-compose.dev.yml build
push-server:

push-dev-images:
	docker compose -f packages/twenty-docker/docker-compose.dev.yml push server
deploy-dev:
	docker --context nm-dev compose -f packages/twenty-docker/docker-compose.dev.yml \
		--env-file packages/twenty-docker/.env.dev up -d
