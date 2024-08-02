@REM docker compose kill
@REM docker compose down
@REM timeout 1

@REM docker volume prune
@REM docker system prune

docker compose up -d --build
docker compose logs -f
