const { PrismaClient } = require('@prisma/client');
const createHandledQuery = require('../../../utils/createHandledQuery')
const prisma = new PrismaClient()

async function query(userId, workoutId) {
  return prisma.workout.findFirst({
    where: { userId, id: Number(workoutId) }
  })
}

const getMyWorkout = createHandledQuery(query)

module.exports = getMyWorkout
