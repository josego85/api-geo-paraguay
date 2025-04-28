#!/bin/bash

# Fail immediately if a command exits with a non-zero status
set -e

# Load environment variables
if [ -f .env ]; then
  set -o allexport
  source .env
  set +o allexport
else
  echo "❌ Error: .env file not found. Please create a .env file with the SONAR_TOKEN variable."
  exit 1
fi

# Check if SONAR_TOKEN is set
if [ -z "$SONAR_TOKEN" ]; then
  echo "❌ Error: SONAR_TOKEN is not set. Please check your .env file."
  exit 1
fi

# Execute Sonar Scanner
echo "🚀 Running Sonar Scanner..."
sonar-scanner
