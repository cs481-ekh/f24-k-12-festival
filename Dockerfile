# Use Node.js base image from the official Node repository
FROM node:18-alpine

ARG NEXT_PUBLIC_BASE_PATH=""
ENV NEXT_PUBLIC_BASE_PATH $NEXT_PUBLIC_BASE_PATH

# Install bash and git-lfs
RUN apk add --no-cache bash git git-lfs \
    && git lfs install

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Pull any Git LFS files
RUN git lfs pull

# Copy database file
COPY /vendors.db ./data/

# Build the Next.js app
RUN npm run build

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Command to start the Next.js app
CMD ["npm", "run", "start"]
