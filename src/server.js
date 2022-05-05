require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const PORT = process.env.PORT || 4000
const app = require('./middleware')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: async ({ req }) => ({ ...req })
});

(async () => {
  await server.start()
  
  server.applyMiddleware({
    app,
    path: '/',
    cors: false
  })

  app.listen({ port: PORT }, () => {
    console.log(`Server running on PORT: ${PORT}`)
  })
})();

export {}
