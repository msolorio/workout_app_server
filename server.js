require('dotenv').config()
const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');


const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma
  }
});

(async () => {
  const { url } = await server.listen();

  console.log(`Your server is running at ${url}`);
})();
