#!/bin/bash
set -e

COMPOSE_FILE="../docker-compose.yml"

if [ ! -f "$COMPOSE_FILE" ]; then
    echo "❌ docker-compose.yml not found at $COMPOSE_FILE"
    exit 1
fi

# Optional: validate services exist if user passes arguments
SERVICES=${@:-}  # empty means all services
if [ -n "$SERVICES" ]; then
    for SERVICE in $SERVICES; do
        if ! grep -q "^\s*$SERVICE:" "$COMPOSE_FILE"; then
            echo "❌ Service '$SERVICE' not found in docker-compose.yml"
            exit 1
        fi
    done
    echo "🚀 Starting specified services: $SERVICES"
    docker compose -f "$COMPOSE_FILE" up -d --build $SERVICES
else
    echo "🚀 Starting all services..."
    docker compose -f "$COMPOSE_FILE" up -d --build
fi

echo "✅ Services are up"
