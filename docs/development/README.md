# Development Tools

## Testing & Code Quality

### Dependencies Update
```bash
# Check for package updates
npx npm-check-updates

# Update package.json with new versions
npx npm-check-updates -u
```

### Unit Tests
```bash
docker exec -it app-api-geo-paraguay sh
npm run test
```

### Format & Lint
```bash
# Prettier
npm run format:check
npm run format:write

# ESLint
npm run lint:check
npm run lint:fix
```

## Tool Integration

### Code Quality
[See SonarQube documentation](sonarqube.md)

### API Linting
[See Spectral documentation](spectral.md) - OpenAPI/AsyncAPI specification validation
