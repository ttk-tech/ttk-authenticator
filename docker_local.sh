#!/bin/bash
# This is for running the application using Docker, require .env file to be setup locally
# Define variables
IMAGE_NAME="ttkn-authenticator-image"
CONTAINER_NAME="ttkn-authenticator-container"
PORT=3000
ENV_FILE="./.env"

# Step 1: Build the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME --no-cache .

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo "Docker image built successfully."
else
    echo "Docker image build failed."
    exit 1
fi

# Step 2: Run the Docker container
# First, remove any existing container with the same name
echo "Removing existing container..."
docker rm -f $CONTAINER_NAME

# Now, run the new container
echo "Running Docker container..."
docker run --name $CONTAINER_NAME -p $PORT:$PORT --env-file $ENV_FILE -d $IMAGE_NAME

# Check if the container is running
if [ $? -eq 0 ]; then
    echo "Docker container is running."
    echo "Application is accessible at http://localhost:$PORT"
else
    echo "Failed to start Docker container."
    exit 1
fi