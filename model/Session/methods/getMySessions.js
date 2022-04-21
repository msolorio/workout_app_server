const { PrismaClient } = require('@prisma/client');
const createHandledQuery = require('../../../utils/createHandledQuery')
const prisma = new PrismaClient()

async function query(userId) {
  return prisma.session.findMany({ where: { userId } })
}

const getMySessions = createHandledQuery(query)

module.exports = getMySessions
