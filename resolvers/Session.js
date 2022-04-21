const tryQuery = require('../utils/tryQuery')

module.exports = {
  workout: (parent, args, context) => {
    return tryQuery(() => {
      return context.prisma.session.findUnique({ where: { id: parent.id } }).workout()
    })
  },

  exerciseInstances: (parent, args, context) => {
    return tryQuery(() => {
      return context.prisma.session.findUnique({ where: { id: parent.id } }).exerciseInstances()
    })
  },

  user: (parent, args, context) => {
    return tryQuery(() => {
      return context.prisma.session.findUnique({ where: { id: parent.id } }).user()
    })
  },

  date: (parent, args, context) => {
    return parent.createdAt
  }
}