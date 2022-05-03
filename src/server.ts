require('dotenv').config()
// const { ApolloServer } = require('apollo-server');
const { ApolloServer } = require('apollo-server-express');
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const verifyAuth = require('./utils/verifyAuth')
const PORT = process.env.PORT || 4000

const app = express()

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(async (req, res, next) => {
  const userId = await verifyAuth(req.cookies.token)

  req.userId = userId

  next()
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ req }) => {
    // const userId = await verifyAuth(req.body.variables?.token)

    return {
      ...req
    }
  }
});

(async () => {
  await server.start()

  server.applyMiddleware({
    app,
    path: '/',
    cors: false
  })


  // const { url } = await server.listen(PORT);
  // console.log(`Your server is running at ${url}`);
  
  app.listen({ port: PORT }, () => {
    console.log(`Your server is running on PORT: ${PORT}`)
  })
})();

export {}
