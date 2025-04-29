# REST API Documentation

## Endpoints Overview

```bash
GET /api/v1/paraguay/{longitude}/{latitude}   # Get geographical data by coordinates
GET /api/v1/departamentos                     # List all departments
GET /api/v1/departamentos/{id}               # Get department by ID
GET /api/v1/distritos                        # List all districts
GET /api/v1/distritos/{id}                   # Get district by ID
GET /api/v1/ciudades                         # List all cities
GET /api/v1/ciudades/{id}                    # Get city by ID
GET /api/v1/barrios                          # List all neighborhoods
GET /api/v1/barrios/{id}                     # Get neighborhood by ID
```

## Example Requests

### Get Geographical Data by Coordinates

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
