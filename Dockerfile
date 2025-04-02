# --- Builder Stage ---
FROM node:latest AS builder

WORKDIR /app

# Install Meteor globally
RUN curl https://install.meteor.com/ | sh

# Copy Meteor project files
COPY . .

# Install Meteor dependencies
RUN meteor npm install

# Build the Meteor application
RUN meteor build --directory /app/build --allow-superuser

# --- Production Stage ---
FROM node:lts-alpine

WORKDIR /app

# Install necessary dependencies
RUN apk add --no-cache bash

# Copy built application from the builder stage
COPY --from=builder /app/build/bundle . 

# Install production dependencies
RUN cd programs/server && npm install --omit=dev

# Set environment variables
ENV ROOT_URL=http://localhost:3000
ENV MONGO_URL=mongodb://localhost:27017/meteor

# Expose the Meteor app port
EXPOSE 3000

# Command to start your Meteor app
CMD ["node", "main.js"]
