const { PrismaClient } = require('@prisma/client');
const createHandledQuery = require('../../../utils/createHandledQuery')
const prisma = new PrismaClient()

async function query(workoutId) {
  return prisma.session.findMany({ where: { workoutId } })
}

const getSessions = createHandledQuery(query)

module.exports = getSessions
