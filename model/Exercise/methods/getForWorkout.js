const { PrismaClient } = require('@prisma/client');
const createHandledQuery = require('../../../utils/createHandledQuery')
const prisma = new PrismaClient()

async function query(workoutId) {
  return prisma.exercise.findMany({ where: { workoutId } })
}

const getExercises = createHandledQuery(query)

module.exports = getExercises
