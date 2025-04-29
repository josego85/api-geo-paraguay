# DIUN - Docker Image Update Notifier

[DIUN (Docker Image Update Notifier)](https://crazymax.dev/diun/) is a lightweight, open-source tool that monitors Docker images for updates and notifies you when new versions are available.

This project integrates Diun as part of the development and deployment workflow to keep Docker images up to date in a controlled and visible manner.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Configuration](#configuration)
- [Usage](#usage)
- [Monitoring Static Images](#monitoring-static-images)
- [Notifications (Planned)](#notifications-planned)
- [References](#references)

## Overview

Diun automatically detects updates for Docker images used in:

- Running containers
- Defined static images (e.g., NodeJS, NGINX)

By integrating Diun, we ensure awareness of new Docker image releases and maintain an up-to-date environment while avoiding unexpected changes in deployments.

## Features

- Monitor running Docker containers for image updates
- Monitor specific static images not bound to a running container
- Flexible scheduling via cron expressions
- Lightweight and efficient
- Ready for notification integrations (Email, Slack, Telegram, etc.)

## Folder Structure

| Folder                     | Purpose                          |
| :------------------------- | :------------------------------- |
| `/deploy/diun/diun.yml`    | Main Diun configuration file     |
| `/deploy/diun/watched.yml` | List of static images to monitor |

## Configuration

### Docker Compose Setup

The Diun service is defined inside `docker-compose.dev.yml`:

```yaml
diun:
  image: crazymax/diun:latest
  command: serve --config /deploy/diun/diun.yml
  volumes:
    - './deploy/diun:/deploy/diun'
    - '/var/run/docker.sock:/var/run/docker.sock'
  environment:
    - TZ=Europe/Berlin
  restart: always
  networks:
    - app-network
```

### Main Configuration (`diun.yml`)

```yaml
watch:
  workers: 20
  schedule: '*/5 * * * *'
  jitter: 30s

providers:
  docker:
    endpoint: unix:///var/run/docker.sock
    watchByDefault: true

  file:
    filename: /deploy/diun/watched.yml
```

### Static Images to Monitor (`watched.yml`)

```yaml
- name: node:22-alpine3.21
- name: nginx:1-alpine
```

## Usage

### Start Diun

```bash
docker compose -f docker-compose.dev.yml up -d diun
```

### Check Logs

```bash
docker compose logs -f diun
```

## Monitoring Static Images

Static images listed in `watched.yml` are checked independently of running containers.  
This ensures awareness of important base images (NodeJS, NGINX, Redis, etc.) even if they're only referenced in `Dockerfile`s.

## Notifications (Planned)

Future enhancements will include integration with:

- **Telegram**: Instant messaging alerts
- **Email**: Formal update notifications
- **Slack**: Team-based alerts

## References

- [Diun Official Documentation](https://crazymax.dev/diun/)
- [Diun GitHub Repository](https://github.com/crazy-max/diun)
