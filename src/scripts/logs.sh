#!/bin/bash
set -e

# Default service(s)
SERVICES=${@:-pulseops-app}

# Path to docker-compose.yml
COMPOSE_FILE="../docker-compose.yml"

# Check if docker-compose.yml exists
if [ ! -f "$COMPOSE_FILE" ]; then
    echo "❌ docker-compose.yml not found at $COMPOSE_FILE"
    exit 1
fi

# Validate each service exists in docker-compose.yml
for SERVICE in $SERVICES; do
    if ! grep -q "^\s*$SERVICE:" "$COMPOSE_FILE"; then
        echo "❌ Service '$SERVICE' not found in docker-compose.yml"
        exit 1
    fi
done

echo "📖 Following logs for services: $SERVICES"
docker compose -f "$COMPOSE_FILE" logs -f $SERVICES
