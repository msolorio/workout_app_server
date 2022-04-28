const prisma = require('../../../prisma')
const createHandledQuery = require('../../../utils/createHandledQuery')


async function query(workoutId) {
  return prisma.session.findMany({ where: { workoutId } })
}

const getSessions = createHandledQuery(query)

module.exports = getSessions
