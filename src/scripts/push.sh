#!/bin/bash
set -e

source scripts/config.sh

# Check environment variable
if [ "$DOCKER_PUSH" != "true" ]; then
  echo "⚠️  Skipping Docker push. Set DOCKER_PUSH=true to enable."
  exit 0
fi

# Check if image exists locally
if [[ -z $(docker images -q $IMAGE_NAME:$TAG) ]]; then
    echo "❌ Image $IMAGE_NAME:$TAG does not exist locally. Build it first."
    exit 1
fi

echo "🚀 Pushing Docker image: $IMAGE_NAME:$TAG"

# Push the dynamic tag
docker push $IMAGE_NAME:$TAG

# Tag as latest and push
docker tag $IMAGE_NAME:$TAG $IMAGE_NAME:latest
docker push $IMAGE_NAME:latest

echo "✅ Push successful for $TAG and latest"
