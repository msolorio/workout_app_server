const tryQuery = require('../utils/tryQuery')

module.exports = {
  exercise: (parent, args, context) => {
    return tryQuery(() => {
      return context.prisma.exerciseInstance.findUnique({ where: { id: parent.id }}).exercise()
    })
  },

  session: (parent, args, context) => {
    return tryQuery(() => {
      return context.prisma.exerciseInstance.findUnique({ where: { id: parent.id } }).session()
    })
  }
}
