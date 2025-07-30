import { createServer } from "http";
import { graphql } from "graphql";
import { buildSchema } from "graphql";

let stores = [];

const schema = buildSchema(`
  type Store {
    id: ID!
    name: String!
    address: String!
    image: String!
  }

  input StoreInput {
    name: String!
    address: String!
    image: String!
  }

  type Query {
    stores: [Store!]!
    store(id: ID!): Store
  }

  type Mutation {
    addStore(input: StoreInput!): Store
    updateStore(id: ID!, input: StoreInput!): Store
    deleteStore(id: ID!): Boolean
  }
`);

const root = {
  stores: () => stores,
  store: ({ id }) => stores.find((s) => s.id === id),
  addStore: ({ input }) => {
    const store = { id: String(Date.now()), ...input };
    stores.push(store);
    return store;
  },
  updateStore: ({ id, input }) => {
    const index = stores.findIndex((s) => s.id === id);
    if (index === -1) return null;
    stores[index] = { id, ...input };
    return stores[index];
  },
  deleteStore: ({ id }) => {
    const index = stores.findIndex((s) => s.id === id);
    if (index === -1) return false;
    stores.splice(index, 1);
    return true;
  },
};

createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/graphql") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const { query, variables } = JSON.parse(body);
      const result = await graphql({ schema, source: query, rootValue: root, variableValues: variables });
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    });
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(4000);

console.log("GraphQL API running at http://localhost:4000/graphql");
