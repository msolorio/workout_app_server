const prisma = require('../../../prisma')
const createHandledQuery = require('../../../utils/createHandledQuery')


async function query(userId, workoutId) {
  // .deleteMany allows for passing more than
  // one arg. .delete does not.
  return prisma.workout.deleteMany({
    where: { userId: userId, id: Number(workoutId) }
  })
}

const deleteWorkout = createHandledQuery(query)

module.exports = deleteWorkout
