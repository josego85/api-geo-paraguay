# REST API Documentation

## Endpoints

### Geographic Data
- `GET /api/v1/paraguay/{longitude}/{latitude}` - Get location details by coordinates
- `GET /api/v1/departamentos` - List all departments
- `GET /api/v1/distritos` - List all districts
- `GET /api/v1/ciudades` - List all cities
- `GET /api/v1/barrios` - List all neighborhoods

## Sorting

All list endpoints support sorting via the `sort` query parameter:

```bash
# Format
?sort={field}:{order}

# Where:
# - field: The column to sort by
# - order: 'asc' or 'desc' (case insensitive)
```

### Available Sort Fields

#### Departments
```bash
# Sort by ID
/api/v1/departamentos?sort=departamento_id:asc

# Sort by name
/api/v1/departamentos?sort=departamento_nombre:desc

# Sort by capital
/api/v1/departamentos?sort=departamento_capital:desc
```

#### Cities
```bash
# Sort by ID
/api/v1/ciudades?sort=ciudad_id:asc

# Sort by name
/api/v1/ciudades?sort=ciudad_nombre:desc
```

#### Districts
```bash
# Sort by ID
/api/v1/distritos?sort=distrito_id:asc

# Sort by name
/api/v1/distritos?sort=distrito_nombre:desc
```

#### Neighborhoods
```bash
# Sort by ID
/api/v1/barrios?sort=barrio_id:asc

# Sort by name
/api/v1/barrios?sort=barrio_nombre:desc
```

## Response Format

### Success Response

- **Code**: 200 OK
- **Content**: Application/json

```json
{
  "data": [
    {
      "departamento_id": 2,
      "departamento_nombre": "San Pedro",
      "departamento_capital": "San Pedro de Ycuamandiyú"
    },
    {
      "departamento_id": 15,
      "departamento_nombre": "Presidente Hayes",
      "departamento_capital": "Villa Hayes"
    }
    ...
  ]
}

```

### Error Response

- **Code**: 4xx or 5xx
- **Content**: Application/json

```json
{
  "error": {
    "code": "NotFound",
    "message": "The requested resource was not found."
  }
}
```
