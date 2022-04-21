const { PrismaClient } = require('@prisma/client');
const createHandledQuery = require('../../../utils/createHandledQuery')
const prisma = new PrismaClient()

async function query(exerciseId) {
  return prisma.exerciseInstance.findMany({
    where: { exerciseId }
  })
}

const getForExercise = createHandledQuery(query)

module.exports = getForExercise
