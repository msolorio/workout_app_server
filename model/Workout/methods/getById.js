const { PrismaClient } = require('@prisma/client');
const createHandledQuery = require('../../../utils/createHandledQuery')
const prisma = new PrismaClient()

async function query(workoutId) {
  return prisma.workout.findUnique({ where: { id: workoutId } })
}

const getWorkoutById = createHandledQuery(query)

module.exports = getWorkoutById
