# --- Stage 1: Build Dependencies ---
# Leverages a full Node.js image for robust dependency installation.
FROM node:22.21.1@sha256:dcf06103a9d4087e3244a51697adbbb85331dcb7161dbe994ca1cd07dd32e2a5 AS deps

# Set working directory.
WORKDIR /app

# Copy only package metadata. This layer is highly cacheable.
# Changes here invalidate subsequent dependency install steps.
COPY package*.json ./

# Install dependencies. '--frozen-lockfile' ensures reproducible builds.
RUN npm install --frozen-lockfile

# --- Stage 2: Final Development Image ---
# Uses a minimal Alpine-based Node.js image for a smaller footprint.
FROM node:22.21.1-alpine@sha256:b2358485e3e33bc3a33114d2b1bdb18cdbe4df01bd2b257198eb51beb1f026c5

# Set working directory.
WORKDIR /app

# Copy installed node_modules from the 'deps' stage.
# Avoids re-installation and unnecessary build artifacts.
COPY --from=deps /app/node_modules ./node_modules

# Copy application source code.
# A robust '.dockerignore' is crucial to prevent extraneous files.
COPY . .

# Expose development port.
EXPOSE 5000

# Start development server.
CMD ["npm", "start"]