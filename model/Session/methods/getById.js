const { PrismaClient } = require('@prisma/client');
const createHandledQuery = require('../../../utils/createHandledQuery')
const prisma = new PrismaClient()

async function query(sessionId) {
  return prisma.session.findUnique({ where: { id: sessionId } })
}

const getById = createHandledQuery(query)

module.exports = getById
