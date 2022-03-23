require('dotenv').config()
const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const { AuthenticationError } = require('apollo-server')
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const verifyAuth = require('./utils/verifyAuth')

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const userId = await verifyAuth(req.body.variables?.token)

    return {
      ...req,
      prisma,
      userId: userId
    }
  }
});

(async () => {
  const { url } = await server.listen();

  console.log(`Your server is running at ${url}`);
})();
