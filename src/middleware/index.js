const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const verifyAuth = require('../utils/verifyAuth')

const app = express()

const corsOptions = {
  origin: process.env.CLIENT_ENDPOINT,
  credentials: true
}

app.use(cors(corsOptions))
app.use(cookieParser())

app.use(async (req, res, next) => {
  const userId = await verifyAuth(req.cookies.token)

  req.userId = userId

  next()
})

module.exports = app

export {}
