#!/bin/sh

# Step 1: Check if Docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo "Error: Docker is not installed." >&2
  exit 1
fi

# Step 2: Build the Docker container
echo "Building the Docker container..."
docker build --build-arg DATABASE_URL=${DATABASE_URL} -t nextjs_project_container .

if [ $? -ne 0 ]; then
  echo "Docker build failed."
  exit 1
fi

# Step 3: Ensure the container is built (Optional check)
echo "Checking if the Docker container is built..."
docker image inspect nextjs_project_container > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "Error: Docker container not found. Build the project first."
  exit 1
fi

# Step 4: Run tests inside the container
echo "Running tests..."
docker run --rm -e DATABASE_URL=${DATABASE_URL} nextjs_project_container /bin/bash -c "
    echo 'Running tests...'
    npm test

    if [ $? -ne 0 ]; then
      echo 'Tests failed.'
      exit 1
    fi

    echo 'All tests passed.'
"

if [ $? -ne 0 ]; then
  echo "Tests failed."
  exit 1
fi

echo "All tests passed."
exit 0