const prisma = require('../../../prisma')
const createHandledQuery = require('../../../utils/createHandledQuery')


async function query(workoutId) {
  return prisma.exercise.findMany({ where: { workoutId } })
}

const getExercises = createHandledQuery(query)

module.exports = getExercises
