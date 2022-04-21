const {
  Workout,
  Session
} = require('../model')

module.exports = {
  info: () => 'This is the info',


  workouts: async (parent, args, context) => {
    const { userId } = context

    return await Workout.getMyWorkouts(userId)
  },
  
  
  workout: async (parent, args, context) => {
    const { userId } = context
    const workoutId = args.id

    return await Workout.getMyWorkout(userId, workoutId)
  },


  session: async (parent, args, context) => {
    const { userId } = context
    const sessionId = args.id

    return await Session.getMySession(userId, sessionId)
  },


  sessions: async (parent, args, context) => {
    const { userId } = context
    
    return await Session.getMySessions(userId)
  }
}