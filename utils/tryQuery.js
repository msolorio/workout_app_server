const { ApolloError } = require('apollo-server')

function tryQuery(query) {
  try { return query() }
  catch (err) {
    console.log('err', err)
    throw new ApolloError('There was an error retrieving your data.')
  }
}

module.exports = tryQuery
