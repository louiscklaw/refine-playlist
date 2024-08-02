#!/usr/bin/env bash

set -ex

docker compose kill
docker compose down

sleep 1

docker compose up -d
docker compose logs -f
