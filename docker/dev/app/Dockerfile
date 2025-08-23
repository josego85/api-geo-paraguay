# --- Stage 1: Build Dependencies ---
# Leverages a full Node.js image for robust dependency installation.
FROM node:22.18.0 AS deps

# Set working directory.
WORKDIR /app

# Copy only package metadata. This layer is highly cacheable.
# Changes here invalidate subsequent dependency install steps.
COPY package*.json ./

# Install dependencies. '--frozen-lockfile' ensures reproducible builds.
RUN npm install --frozen-lockfile

# --- Stage 2: Final Development Image ---
# Uses a minimal Alpine-based Node.js image for a smaller footprint.
FROM node:22.18.0-alpine

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