#!/bin/sh

# Step 1: Check if Docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo "Error: Docker is not installed." >&2
  exit 1
fi

# Step 2: Build the Docker container
echo "Building the Docker container..."
docker build -t nextjs_project_container .

if [ $? -ne 0 ]; then
  echo "Docker build failed."
  exit 1
fi

# Step 3: Run build commands inside the container
echo "Running build process inside the container..."
docker run --rm -v sqlite_data:/app/data nextjs_project_container /bin/bash -c "
    echo 'Installing dependencies...'
    npm install

    if [ $? -ne 0 ]; then
      echo 'npm install failed.'
      exit 1
    fi

    echo 'Building the Next.js app...'
    npm run build

    if [ $? -ne 0 ]; then
      echo 'Next.js build failed.'
      exit 1
    fi

    echo 'Build completed successfully.'
"

if [ $? -ne 0 ]; then
  echo "Build process failed."
  exit 1
fi

echo "Build process completed."
exit 0
