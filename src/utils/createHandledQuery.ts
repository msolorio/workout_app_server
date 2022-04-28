const { ApolloError } = require('apollo-server')

function createHandledQuery(query: any) {
  return async function (...args: any[]) {

    try {
      return await query(...args)
    } catch (err) {
      console.log('err', err)
    }
  }
}

module.exports = createHandledQuery
