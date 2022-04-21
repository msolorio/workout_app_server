const { PrismaClient } = require('@prisma/client');
const createHandledQuery = require('../../../utils/createHandledQuery')
const prisma = new PrismaClient()

async function query(sessionId) {
  return prisma.exerciseInstance.findMany({
    where: { sessionId }
  })
}

const getExInstancesForSession = createHandledQuery(query)

module.exports = getExInstancesForSession
