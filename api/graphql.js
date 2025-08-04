import { buildSchema, graphql } from 'graphql';

// Initial data
const stores = [
  {
    id: "fashion-square",
    name: "Fashion Square",
    location: "SCOTTSDALE, AZ",
    address: "7014 E Camelback Rd, STE #1448",
    status: "active",
    opening_date: "2023-05-15",
    image: "https://cdn.shopify.com/s/files/1/0752/2998/7029/files/store-fashion-square.webp",
    shopify_url: "https://your-store.myshopify.com/pages/fashion-square"
  },
  // ... other stores (keep as is)
];

// Define schema
const schema = buildSchema(`
  type Store {
    id: ID!
    name: String!
    location: String!
    address: String!
    status: String!
    opening_date: String!
    image: String!
    shopify_url: String
  }

  input CreateStoreInput {
    id: ID!
    name: String!
    location: String!
    address: String!
    status: String!
    opening_date: String!
    image: String!
    shopify_url: String
  }

  type Query {
    stores(status: String): [Store]
    store(id: ID!): Store
  }

  type Mutation {
    createStore(input: CreateStoreInput!): Store
  }
`);

// Define resolvers
const rootValue = {
  stores: ({ status }) => status ? stores.filter(s => s.status === status) : stores,
  store: ({ id }) => stores.find(s => s.id === id),
  createStore: ({ input }) => {
    const exists = stores.find(s => s.id === input.id);
    if (exists) {
      throw new Error(`Store with ID "${input.id}" already exists.`);
    }
    stores.push(input);
    return input;
  }
};

// Define handler
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { query, variables } = req.body;

    if (!query) {
      res.status(400).json({ error: 'Query is required' });
      return;
    }

    const result = await graphql({
      schema,
      source: query,
      rootValue,
      variableValues: variables,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('GraphQL Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}
