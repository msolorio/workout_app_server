const { PrismaClient } = require('@prisma/client');
const createHandledQuery = require('../../../utils/createHandledQuery')
const prisma = new PrismaClient()

async function query(userId) {
  return prisma.user.findUnique({ where: { id: userId } })
}

const getUserById = createHandledQuery(query)

module.exports = getUserById
