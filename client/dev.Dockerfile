FROM node:11-slim

# Create and define the node_modules's cache directory.
ENV CACHE_PATH /cache
RUN mkdir /$CACHE_PATH
WORKDIR /$CACHE_PATH

# Install the application's dependencies into the node_modules's cache directory.
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Create and define the application's working directory.
ENV APP_NAME /graphql-auth-client
RUN mkdir /$APP_NAME
WORKDIR /$APP_NAME

COPY . /$APP_NAME
