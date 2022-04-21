const tryQuery = require('../utils/tryQuery')

module.exports = {
  info: () => 'This is the info',


  workouts: async (parent, args, context) => {
    return tryQuery(() => {
      return context.prisma.workout.findMany({
        where: { userId: context.userId }
      })
    })
  },

  
  workout: (parent, args, context) => {
    return tryQuery(() => {
      return context.prisma.workout.findFirst({
        where: {
          userId: context.userId,
          id: Number(args.id)
        }
      })
    })
  },


  session: (parent, args, context) => {
    return tryQuery(() => {
      return context.prisma.session.findFirst({
        where: {
          userId: context.userId,
          id: Number(args.id)
        }
      })
    })
  },


  sessions: (parent, args, context) => {
    return tryQuery(() => {
      return context.prisma.session.findMany({
        where: { userId: context.userId }
      })
    })
  }
}