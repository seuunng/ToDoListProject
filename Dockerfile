# Multi-stage build for Node.js frontend
FROM node:14-alpine AS frontend

WORKDIR /app

# Install dependencies and build the React app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Multi-stage build for Spring Boot backend
FROM openjdk:17-jdk-slim AS backend

WORKDIR /app

# Copy the backend code
COPY backend/build/libs/backend-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose the port the app runs on
EXPOSE 9099

# Start the backend service
CMD ["java", "-jar", "/app/app.jar"]