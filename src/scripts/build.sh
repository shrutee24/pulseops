#!/bin/bash
set -e

source scripts/config.sh

echo "🔨 Building Docker image: $IMAGE_NAME:$TAG"

# Use parent folder as context if you run script from /src
docker build -t $IMAGE_NAME:$TAG -f ../Dockerfile ..

# Also tag latest
docker tag $IMAGE_NAME:$TAG $IMAGE_NAME:latest

echo "✅ Build completed: $IMAGE_NAME:$TAG"
