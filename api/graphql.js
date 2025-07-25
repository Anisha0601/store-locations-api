import { buildSchema, graphql } from 'graphql';

const stores = [
  {
    id: "fashion-square",
    name: "Fashion Square",
    location: "SCOTTSDALE, AZ",
    address: "7014 E Camelback Rd, STE #1448",
    status: "active",
    opening_date: "2023-05-15",
    image: "https://cdn.shopify.com/s/files/...",
    shopify_url: "https://your-store.myshopify.com/pages/fashion-square"
  }
];

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
  type Query {
    stores(status: String): [Store]
    store(id: ID!): Store
  }
`);

const rootValue = {
  stores: ({ status }) => {
    if (status) {
      return stores.filter(store => store.status === status);
    }
    return stores;
  },
  store: ({ id }) => stores.find(store => store.id === id),
};

export default async function handler(req, res) {
  // Handle CORS
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
      message: error.message 
    });
  }
}




