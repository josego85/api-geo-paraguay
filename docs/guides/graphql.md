# GraphQL API

## Overview

The GraphQL API provides a flexible way to query geographical data with precise control over the response structure.

## GraphQL Playground

Access the interactive GraphQL Playground at:

```
http://87.106.81.190/graphql
```

## Features

- Interactive GraphQL Playground for query testing
- Flexible query structure
- Efficient data fetching
- Type-safe schema
- Query depth limiting for security

## Query Examples

```graphql
# Get department with cities
query {
  department(id: 1) {
    name
    cities {
      name
    }
  }
}
```
