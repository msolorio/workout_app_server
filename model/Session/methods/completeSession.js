const prisma = require('../../../prisma')
const createHandledQuery = require('../../../utils/createHandledQuery')


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
