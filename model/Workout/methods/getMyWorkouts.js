const prisma = require('../../../prisma')
const createHandledQuery = require('../../../utils/createHandledQuery')


async function query(userId) {
  return prisma.workout.findMany({ where: { userId } })
}

const getMyWorkouts = createHandledQuery(query)

module.exports = getMyWorkouts
