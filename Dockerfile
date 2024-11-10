# Use Node.js base image from the official Node repository
FROM node:18-alpine

# Install bash, git, curl, and Git LFS
RUN apk add --no-cache bash git curl git-lfs

# Initialize Git LFS
RUN git lfs install

# Set the working directory inside the container
WORKDIR /app

# Install the project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Run git lfs pull to fetch LFS-managed files if needed
RUN git lfs pull

# Copy database file if needed
COPY vendors.db ./data/

# Build the Next.js app
RUN npm run build

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Command to start the Next.js app
CMD ["npm", "run", "start"]
