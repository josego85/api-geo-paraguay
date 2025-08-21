const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

let openapiPath;
try {
  if (process.env.NODE_ENV === 'production') {
    openapiPath = path.join(process.cwd(), 'dist/docs/api/openapi.yaml');
  } else {
    openapiPath = path.join(__dirname, '../../../docs/api/openapi.yaml');
  }
  const swagger = yaml.load(fs.readFileSync(openapiPath, 'utf8'));
  module.exports = swagger;
} catch (err) {
  console.error(`Failed to load OpenAPI spec from ${openapiPath}:`, err);
  process.exit(1);
}
