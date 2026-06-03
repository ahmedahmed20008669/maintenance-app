# Base image
FROM node:20-alpine AS base

# Install build dependencies for better-sqlite3
RUN apk add --no-cache libc6-compat python3 make g++

# Working directory
WORKDIR /app

# Dependencies stage
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Builder stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Runner stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV DATABASE_PATH="/data/dev.db"

# Create data directory for persistent volume mount
RUN mkdir -p /data

# Copy build artifacts and dependencies
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/start.sh ./start.sh

# Make start.sh executable
RUN chmod +x ./start.sh

# Expose Next.js port
EXPOSE 3000

# Start the application using startup script
CMD ["./start.sh"]
