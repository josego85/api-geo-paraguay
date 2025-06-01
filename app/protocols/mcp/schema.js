const typeDefs = /* GraphQL */ `
  scalar JSON

  type City {
    id: ID!
    name: String!
  }

  type MCPResponse {
    status: String!
    data: [City]
    metadata: JSON
    timestamp: String!
  }

  input MCPHeader {
    version: String!
    messageId: String!
  }

  input MCPBody {
    type: String
    query: String
    page: Int
    limit: Int
  }

  input MCPMessage {
    header: MCPHeader!
    body: MCPBody!
  }

  type Query {
    mcpQuery(message: MCPMessage!): MCPResponse!
  }
`;

module.exports = typeDefs;
