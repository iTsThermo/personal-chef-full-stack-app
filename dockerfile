# Multi-stage build for pnpm monorepo
FROM node:18.17.1-alpine AS base

# Install pnpm
RUN npm install -g pnpm@10.15.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY apps/website/package.json ./apps/website/
COPY apps/node/package.json ./apps/node/
COPY packages/utils/package.json ./packages/utils/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build stage
FROM base AS builder
RUN pnpm run build:all

# Production stage for Node.js server
FROM node:18.17.1-alpine AS production

# Install pnpm
RUN npm install -g pnpm@10.15.0

WORKDIR /app

# Copy package files for production
COPY package.json pnpm-lock.yaml ./
COPY apps/node/package.json ./apps/node/

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy built applications
COPY --from=builder /app/apps/node/dist ./apps/node/dist
COPY --from=builder /app/apps/website/dist ./apps/website/dist

# Expose the port your Node.js app runs on
EXPOSE 3000

# Start the Node.js server
CMD ["node", "apps/node/dist/index.js"]