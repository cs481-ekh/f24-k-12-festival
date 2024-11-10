# Use Node.js base image from the official Node repository
FROM node:18-alpine

# Install bash, git, and Git LFS
RUN apk add --no-cache bash git curl && \
    curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | bash && \
    apk add git-lfs

# Initialize Git LFS
RUN git lfs install

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Clone the repository and pull LFS files (for public repositories)
RUN git clone https://github.com/cs481-ekh/f24-k-12-festival.git . && git lfs pull

# Copy the entire project to the working directory
COPY . .

# Copy database file
COPY /vendors.db ./data/

# Build the Next.js app
RUN npm run build

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Command to start the Next.js app
CMD ["npm", "run", "start"]