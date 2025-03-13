import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { getById } from './db/dynamoDb.js';
import 'dotenv/config';

const urlMappings = [
  {
    short: 'abc123',
    long: 'https://www.google.com/'
  },
  {
    short: 'def456',
    long: 'https://www.facebook.com/'
  }
];

const typeDefs = `#graphql
  type UrlMapping {
    short: String
    long: String
  }

  type Query {
    mappings: [UrlMapping],
    getByShort(short: String!): UrlMapping
  }
`;

const resolvers = {
  Query: {
    mappings: () => urlMappings,
    getByShort: (_, { short }) => getById(short),
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3100 },
});

console.log(`🚀  Server ready at: ${url}`);
