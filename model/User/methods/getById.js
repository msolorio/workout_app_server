const prisma = require('../../../prisma')
const createHandledQuery = require('../../../utils/createHandledQuery')


async function query(userId) {
  return prisma.user.findUnique({ where: { id: userId } })
}

const getUserById = createHandledQuery(query)

module.exports = getUserById
