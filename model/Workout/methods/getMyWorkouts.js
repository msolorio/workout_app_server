const { PrismaClient } = require('@prisma/client');
const createHandledQuery = require('../../../utils/createHandledQuery')
const prisma = new PrismaClient()

async function query(userId) {
  return prisma.workout.findMany({ where: { userId } })
}

const getMyWorkouts = createHandledQuery(query)

module.exports = getMyWorkouts
