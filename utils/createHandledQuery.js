const { ApolloError } = require('apollo-server')

function createHandledQuery(query) {
  return async function (...args) {
    try {
      return await query(...args)
    } catch (err) {
      console.log('err', err)
    }
  }
}

module.exports = createHandledQuery
