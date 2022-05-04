const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')

async function verifyAuth(token) {
  if (!token) return false

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)

    if (!decodedToken.userId) {
      throw new AuthenticationError('You are not authenticated. Please log in.')
    }

    return decodedToken.userId

  } catch (err) {
    return false
  }
}

module.exports = verifyAuth
