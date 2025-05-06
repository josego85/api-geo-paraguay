# API Features

## REST API

### Endpoints Overview

```bash
GET /api/v1/paraguay/{longitude}/{latitude}   # Get geographical data by coordinates
GET /api/v1/departments                     # List all departments
GET /api/v1/departments/{id}               # Get department by ID
GET /api/v1/districts                        # List all districts
GET /api/v1/districts/{id}                   # Get district by ID
GET /api/v1/cities                         # List all cities
GET /api/v1/cities/{id}                    # Get city by ID
GET /api/v1/neighborhoods                          # List all neighborhoods
GET /api/v1/neighborhoods/{id}                     # Get neighborhood by ID
```

### Example Requests

#### Get Geographical Data by Coordinates

```bash
curl http://87.106.81.190/api/v1/paraguay/-57.333333/-25.28333
```

Response:

```json
{
  "department": {
    "id": 11,
    "name": "Central"
  },
  "district": {
    "id": 1,
    "name": "Asunción"
  },
  "city": {
    "id": 1,
    "name": "Asunción"
  }
}
```

### API Documentation

Full OpenAPI specification available at:

```
http://87.106.81.190/api-docs/
```
