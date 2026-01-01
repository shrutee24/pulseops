#!/bin/bash
set -e

COMPOSE_FILE="../docker-compose.yml"

if [ ! -f "$COMPOSE_FILE" ]; then
    echo "❌ docker-compose.yml not found at $COMPOSE_FILE"
    exit 1
fi

# Optional: stop specific services
SERVICES=${@:-}  # empty means all services
if [ -n "$SERVICES" ]; then
    for SERVICE in $SERVICES; do
        if ! grep -q "^\s*$SERVICE:" "$COMPOSE_FILE"; then
            echo "❌ Service '$SERVICE' not found in docker-compose.yml"
            exit 1
        fi
    done
    echo "🛑 Stopping specified services: $SERVICES"
    docker compose -f "$COMPOSE_FILE" down $SERVICES
else
    echo "🛑 Stopping all services..."
    docker compose -f "$COMPOSE_FILE" down
fi

echo "✅ Services stopped"
