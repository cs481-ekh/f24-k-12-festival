#!/bin/sh

# Step 1: Check if Docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo "Error: Docker is not installed." >&2
  exit 1
fi

# Step 2: Check if Docker Compose is installed
if ! [ -x "$(command -v docker-compose)" ]; then
  echo "Error: Docker Compose is not installed." >&2
  exit 1
fi

# Step 3: Build the Docker container using Docker Compose
echo "Building the Docker container with Docker Compose..."
docker-compose build

if [ $? -ne 0 ]; then
  echo "Docker Compose build failed."
  exit 1
fi

# Step 4: Start the application using Docker Compose
echo "Starting the application"
docker-compose up -d

if [ $? -ne 0 ]; then
  echo "Docker Compose failed to start the application."
  exit 1
fi

echo "Build process completed."
exit 0
