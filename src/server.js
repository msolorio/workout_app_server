require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const cron = require('node-cron')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const PORT = process.env.PORT || 4000
const app = require('./middleware')
const { seedDirectly } = require('./scripts/seed')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: async ({ req }) => ({ ...req })
});

(async () => {
  await server.start()
  
  server.applyMiddleware({ app, path: '/', cors: false })

  // reset db nightly at midnight pst
  cron.schedule('0 7 * * *', seedDirectly)

  app.listen({ port: PORT }, () => {
    console.log(`Server running on PORT: ${PORT}`)
  })
})();

export {}
