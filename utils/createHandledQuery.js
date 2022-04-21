const { ApolloError } = require('apollo-server')

// createHandledQuery - Creates a function that when called will try the
// query or return an error
function createHandledQuery(query) {
  return async function (...args) {
    try {
      return await query(...args)
    } catch (err) {
      console.log('err', err)
      throw new ApolloError('There was an error retrieving your data.')
    }
  }
}

module.exports = createHandledQuery
