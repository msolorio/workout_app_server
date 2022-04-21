const tryQuery = require('../utils/tryQuery')

module.exports = {
  exercises: (parent, args, context) => {
    return tryQuery(() => {
      return context.prisma.workout.findUnique({ where: { id: parent.id } }).exercises();
    })
  },

  sessions: (parent, args, context) => {
    return tryQuery(() => {
      return context.prisma.workout.findUnique({ where: { id: parent.id }}).sessions()
    })
  },

  user: (parent, args, context) => {
    return tryQuery(() => {
      return context.prisma.workout.findUnique({ where: { id: parent.id } }).user()
    })
  }
}
