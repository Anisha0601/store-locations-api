import { ApolloServer } from '@apollo/server';
import { startServerAndCreateHandler } from '@as-integrations/vercel';
import { gql } from 'graphql-tag';
import stores from '../storeData.js';

const typeDefs = gql`
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
`;

const resolvers = {
  Query: {
    stores: (_, args) => {
      if (args.status) {
        return stores.filter(store => store.status === args.status);
      }
      return stores;
    },
    store: (_, { id }) => stores.find(store => store.id === id),
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateHandler(server);



