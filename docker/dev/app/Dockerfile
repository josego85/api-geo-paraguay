# --- Stage 1: Build Dependencies ---
# Leverages a full Node.js image for robust dependency installation.
FROM node:24.22.3@sha256:9d266751ca3d7fdbe651c878ffd5ad0a42fed49a18c283509267c97f025b7496 AS deps

# Set working directory.
WORKDIR /app

# Copy only package metadata. This layer is highly cacheable.
# Changes here invalidate subsequent dependency install steps.
COPY package*.json ./

# Install dependencies. '--frozen-lockfile' ensures reproducible builds.
RUN npm install --frozen-lockfile

# --- Stage 2: Final Development Image ---
# Uses a minimal Alpine-based Node.js image for a smaller footprint.
FROM node:24.22.3-alpine@sha256:116b800c3754b440ee0aa3ed2f20f5bf3d99a554bfd9adeea09ea8017f6e85f5

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
