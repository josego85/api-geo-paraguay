# REST API Documentation

## Endpoints

### Geographic Data

- `GET /api/v1/paraguay/{longitude}/{latitude}` - Get location details by coordinates
- `GET /api/v1/departments` - List all departments
- `GET /api/v1/distritos` - List all districts
- `GET /api/v1/cities` - List all cities
- `GET /api/v1/neighborhoods` - List all neighborhoods

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
http://localhost:5000/api/v1/departments?page=1&limit=10
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
http://localhost:5000/api/v1/departments?page=1&limit=10&sortField=capital_name&sortOrder=desc
```

### Available Sort Fields

#### Departments

```bash
# Sort by ID
?sortField=id&sortOrder=asc

# Sort by name
?sortField=name&sortOrder=desc

# Sort by capital
?sortField=capital_name&sortOrder=desc
```

#### Cities

```bash
# Sort by ID
?sortField=id&sortOrder=asc

# Sort by name
?sortField=name&sortOrder=desc
```

#### Districts

```bash
# Sort by ID
?sortField=id&sortOrder=asc

# Sort by name
?sortField=name&sortOrder=desc
```

#### Neighborhoods

```bash
# Sort by ID
?sortField=id&sortOrder=asc

# Sort by name
?sortField=name&sortOrder=desc
```

## Response Format

### Success Response

- **Code**: 200 OK
- **Content**: Application/json

```json
{
  "data": [
    {
      "id": 2,
      "name": "San Pedro",
      "capital_name": "San Pedro de Ycuamandiyú"
    },
    {
      "id": 15,
      "name": "Presidente Hayes",
      "capital_name": "Villa Hayes"
    }
    ...
  ]
}

```
