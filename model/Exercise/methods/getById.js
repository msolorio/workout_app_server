const { PrismaClient } = require('@prisma/client');
const createHandledQuery = require('../../../utils/createHandledQuery')
const prisma = new PrismaClient()

async function query(exerciseId) {
  return prisma.exercise.findUnique({ where: { id: exerciseId } })
}

const getById = createHandledQuery(query)

module.exports = getById
