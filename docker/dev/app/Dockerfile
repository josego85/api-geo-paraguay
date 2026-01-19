# --- Stage 1: Build Dependencies ---
# Leverages a full Node.js image for robust dependency installation.
FROM node:24.13.0@sha256:b2b2184ba9b78c022e1d6a7924ec6fba577adf28f15c9d9c457730cc4ad3807a AS deps

# Set working directory.
WORKDIR /app

# Copy only package metadata. This layer is highly cacheable.
# Changes here invalidate subsequent dependency install steps.
COPY package*.json ./

# Install dependencies. '--frozen-lockfile' ensures reproducible builds.
RUN npm install --frozen-lockfile

# --- Stage 2: Final Development Image ---
# Uses a minimal Alpine-based Node.js image for a smaller footprint.
FROM node:24.13.0-alpine@sha256:931d7d57f8c1fd0e2179dbff7cc7da4c9dd100998bc2b32afc85142d8efbc213

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