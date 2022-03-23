const {
  AuthenticationError,
  ApolloError
} = require('apollo-server')

function makeAuthedQuery(userId, query) {
  if (!userId) throw new AuthenticationError('You are not authenticated. Please log in.')

  try {
    return query()

  } catch (err) {
    console.log('err', err)
    throw new ApolloError('There was an error retrieving your data.')
  }
}

module.exports = makeAuthedQuery
