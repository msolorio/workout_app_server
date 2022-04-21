function handledQuery(query) {
  return async function (...args) {
    try {
      return await query(...args)
    } catch (err) {
      console.log('err', err)
      throw new ApolloError('There was an error retrieving your data.')
    }
  }
}

module.exports = handledQuery
