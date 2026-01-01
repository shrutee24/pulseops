#!/bin/bash
set -e

ENV_PATH="$(dirname "$0")/../../.env"
if [ -f "$ENV_PATH" ]; then
    export $(grep -v '^#' "$ENV_PATH" | xargs)
else
    echo "❌ .env file not found at $ENV_PATH"
    exit 1
fi

source "$(dirname "$0")/config.sh"

DOCKER_PUSH="${DOCKER_PUSH,,}" # convert to lowercase

if [ "$DOCKER_PUSH" != "true" ]; then
    echo "⚠️  Skipping Docker push. Set DOCKER_PUSH=true to enable."
    exit 0
fi


if [[ -z $(docker images -q "$IMAGE_NAME:$TAG") ]]; then
    echo "❌ Image $IMAGE_NAME:$TAG does not exist locally. Build it first."
    exit 1
fi

echo "🚀 Pushing Docker image: $IMAGE_NAME:$TAG"
docker push "$IMAGE_NAME:$TAG"

echo "🏷 Tagging image as latest: $IMAGE_NAME:latest"
docker tag "$IMAGE_NAME:$TAG" "$IMAGE_NAME:latest"

echo "🚀 Pushing latest tag: $IMAGE_NAME:latest"
docker push "$IMAGE_NAME:latest"

echo "✅ Docker push completed successfully for $TAG and latest"
