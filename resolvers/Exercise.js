const tryQuery = require('../utils/tryQuery')

module.exports = {
  workout: (parent, args, context) => {
    return tryQuery(() => {
      return context.prisma.exercise.findUnique({ where: { id: parent.id } }).workout()
    })
  },
  
  exerciseInstances: (parent, args, context) => {
    return tryQuery(() => {
      return context.prisma.exercise.findUnique({ where: { id: parent.id } }).exerciseInstances()
    })
  }
}