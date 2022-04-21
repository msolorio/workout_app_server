const { PrismaClient } = require('@prisma/client');
const createHandledQuery = require('../../../utils/createHandledQuery')
const prisma = new PrismaClient()

async function query(userId, sessionId) {
  return prisma.session.updateMany({
    where: {
      userId: userId,
      id: Number(sessionId)
    },
    data: { completed: true }
  })
}

const completeSession = createHandledQuery(query)

module.exports = completeSession
