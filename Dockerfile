# ---- Base Node ----
FROM node:20-alpine AS base
# Add package manager - using pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# ---- Dependencies ----
FROM base AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- Build ----
FROM base AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ---- Production Dependencies ----
FROM base AS prod-deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# ---- Production ----
FROM base AS production
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Expose the port
EXPOSE $PORT

# Start the application
CMD ["node", "dist/main"]

# ---- Development ----
FROM base AS development
WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3001

# Expose the port
EXPOSE $PORT

# Start the application in development mode with hot reload
CMD ["pnpm", "start:dev"]
