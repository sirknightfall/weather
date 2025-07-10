FROM node:18-slim

# Set working directory
WORKDIR /usr/src/app

# Install essential packages
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy the rest of the app in after container start
