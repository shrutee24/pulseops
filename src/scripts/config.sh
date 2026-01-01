#!/bin/bash

# Docker image name
IMAGE_NAME="shrutee577/pulseops"

# Detect git commit hash
GIT_HASH=$(git rev-parse --short HEAD 2>/dev/null)

# Detect current branch name
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

# Priority for tag:
# 1. Environment variable DOCKER_TAG
# 2. Git commit hash
# 3. Branch name
# 4. Default latest
TAG=${DOCKER_TAG:-${GIT_HASH:-${BRANCH_NAME:-latest}}}

# Optional: allow override via CLI argument (still dynamic)
if [ ! -z "$1" ]; then
  TAG="$1"
fi

echo "📌 Using Docker tag: $TAG"
