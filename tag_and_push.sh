#!/bin/bash
set -e

# Ensure we are in the Git repository
if [ ! -d ".git" ]; then
  echo "Not a Git repository."
  exit 1
fi

# Check if the working tree is clean (no uncommitted changes)
# if ! git diff --quiet; then
#   echo "Working tree is not clean. Please commit your changes before tagging."
#   exit 1
# fi

# Load environment variables from .env file
if [ -f ".env" ]; then
  export $(grep -v '^#' .env | xargs -0)
fi

# Get the Docker image name and current version from .env
docker_image_name="${APP_IMAGE_NAME}"
current_version="${APP_VERSION}"

if [ -z "$docker_image_name" ]; then
  echo "Error: APP_IMAGE_NAME environment variable not set in .env."
  exit 1
fi

if [ -z "$current_version" ]; then
  echo "Error: APP_VERSION environment variable not set in .env."
  exit 1
fi

echo "Current version in .env: $current_version"

# Increment the patch version (assuming semantic versioning)
IFS='.' read -r major minor patch <<< "$current_version"
next_patch=$((patch + 1))
next_version="${major}.${minor}.${next_patch}"

echo "Next version: $next_version"

# Build the Docker image with the new version tag
docker build -t "${docker_image_name}:${next_version}" .

# Push the Docker image
docker push "${docker_image_name}:${next_version}"

echo "Successfully built and pushed ${docker_image_name}:${next_version}"

# Update the APP_VERSION in your local .env file
sed -i "s/^APP_VERSION=.*$/APP_VERSION=${next_version}/" .env

echo "Updated APP_VERSION in local .env to: ${next_version}"

echo "Now, on your production server, update the APP_IMAGE in the .env file to: ${docker_image_name}:${next_version} and restart the app service."
