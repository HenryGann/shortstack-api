import { ApolloServer } from '@apollo/server';
import { createNewMapping, getById } from './db/dynamoDb.js';
import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'dotenv/config';

const typeDefs = `#graphql
  type UrlMapping {
    short: String
    long: String
    ttl: Int
  }

  type APIResponse {
    success: Boolean!,
    message: String
  }

  type Query {
    getByShort(short: String!): UrlMapping
  }
  
  type Mutation {
    createNewMapping(long: String!): APIResponse
  }
`;

const resolvers = {
  Query: {
    getByShort: (_, { short }) => getById(short),
  },
  Mutation: {
    createNewMapping: (_, { long }) => createNewMapping(long)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});


if(!process.env.IS_LAMBDA){
  const { url } = await startStandaloneServer(server, {
    listen: { port: 3100 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}

export const handler = process.env.IS_LAMBDA ? startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
)
  :
  null;

