const prisma = require('../../../prisma')
const createHandledQuery = require('../../../utils/createHandledQuery')


async function query(exerciseId) {
  return prisma.exerciseInstance.findMany({
    where: { exerciseId }
  })
}

const getForExercise = createHandledQuery(query)

module.exports = getForExercise
