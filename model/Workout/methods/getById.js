const prisma = require('../../../prisma')
const createHandledQuery = require('../../../utils/createHandledQuery')


async function query(workoutId) {
  return prisma.workout.findUnique({ where: { id: workoutId } })
}

const getWorkoutById = createHandledQuery(query)

module.exports = getWorkoutById
