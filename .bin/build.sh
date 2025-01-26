#!/bin/bash

VERSION_FILE="version.txt"
DOCKER_IMAGE_NAME="hrm-fe"

touch $VERSION_FILE

current_version=$(cat $VERSION_FILE)

if [ -z "$1" ]; then
  IFS='.' read -r -a version_parts <<<"$current_version"
  last_part=$((version_parts[${#version_parts[@]} - 1] + 1))
  new_version="${version_parts[0]}.${version_parts[1]}.${version_parts[2]}.$last_part"
else
  new_version=$1
fi

echo $new_version >$VERSION_FILE

image_name="$DOCKER_IMAGE_NAME:$new_version"

docker build -t $image_name .

if [ $? -eq 0 ]; then
  echo "🚀 Building Docker image with version $new_version"
else
  echo "⚠️ Oops! Something went wrong while building the Docker image. Please check your configuration and try again! 🚫"
  exit 1
fi

if [ "$2" == "--deploy" ]; then
  echo "Deploying Docker Compose with the new image version..."

  IMAGE_VERSION=$new_version docker compose up -d

  if [ $? -eq 0 ]; then
    echo "🚀 Docker Compose deployed successfully with the new image version!"
  else
    echo "⚠️ Oops! Something went wrong while deploying Docker Compose. Please check your configuration and try again! 🚫"
    exit 1
  fi
fi
