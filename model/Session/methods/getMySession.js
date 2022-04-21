const { PrismaClient } = require('@prisma/client');
const createHandledQuery = require('../../../utils/createHandledQuery')
const prisma = new PrismaClient()

async function query(userId, sessionId) {
  return prisma.session.findFirst({
    where: { userId, id: Number(sessionId) }
  })
}

const getMySession = createHandledQuery(query)

module.exports = getMySession
