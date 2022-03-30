# Base image
FROM node:14-alpine as base

# Build stage
FROM base as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Final stage
FROM base
WORKDIR /app
COPY package*.json ./
COPY --from=builder /app/ ./
RUN npm install --only=production
EXPOSE 3001
CMD [ "npm", "run", "start" ]
