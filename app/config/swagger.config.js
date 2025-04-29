const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const openapiPath = path.join(__dirname, '../../docs/api/openapi.yaml');
const swagger = yaml.load(fs.readFileSync(openapiPath, 'utf8'));

module.exports = swagger;
