# REST API Documentation

## Endpoints

### Geographic Data

- `GET /api/v1/paraguay/{longitude}/{latitude}` - Get location details by coordinates
- `GET /api/v1/departamentos` - List all departments
- `GET /api/v1/distritos` - List all districts
- `GET /api/v1/ciudades` - List all cities
- `GET /api/v1/barrios` - List all neighborhoods

## Pagination

All list endpoints support pagination via the `page` and `limit` query parameters:

```bash
# Format
?page={page}&limit={limit}

# Where:
# - page: The page number (starting from 1)
# - limit: The number of items per page
```

### Example

```bash
# Get the first 10 departments
http://localhost:5000/api/v1/departamentos?page=1&limit=10
```

## Sorting

All list endpoints support sorting via the `sortField` and `sortOrder` query parameters:

```bash
# Format
?sortField={field}&sortOrder={order}

# Where:
# - sortField: The column to sort by
# - sortOrder: 'asc' or 'desc' (case insensitive)
```

### Example

```bash
# Sort departments by capital in descending order
http://localhost:5000/api/v1/departamentos?page=1&limit=10&sortField=departamento_capital&sortOrder=desc
```

### Available Sort Fields

#### Departments

```bash
# Sort by ID
?sortField=departamento_id&sortOrder=asc

# Sort by name
?sortField=departamento_nombre&sortOrder=desc

# Sort by capital
?sortField=departamento_capital&sortOrder=desc
```

#### Cities

```bash
# Sort by ID
?sortField=ciudad_id&sortOrder=asc

# Sort by name
?sortField=ciudad_nombre&sortOrder=desc
```

#### Districts

```bash
# Sort by ID
?sortField=distrito_id&sortOrder=asc

# Sort by name
?sortField=distrito_nombre&sortOrder=desc
```

#### Neighborhoods

```bash
# Sort by ID
?sortField=barrio_id&sortOrder=asc

# Sort by name
?sortField=barrio_nombre&sortOrder=desc
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
