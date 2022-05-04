const prisma = require('../../../prisma')
const createHandledQuery = require('../../../utils/createHandledQuery')


async function query(userId, workoutId) {
  // .deleteMany allows for passing more than 1 arg
  const countObj = await prisma.workout.deleteMany({
    where: { userId: userId, id: Number(workoutId) }
  })

  return countObj
}

const deleteWorkout = createHandledQuery(query)

module.exports = deleteWorkout
