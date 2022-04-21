const {
  Session,
  User,
  Exercise
} = require('../model')

module.exports = {
  exercises: async (parent) => {
    const workoutId = parent.id

    return await Exercise.getForWorkout(workoutId)
  },


  sessions: async (parent) => {
    const workoutId = parent.id

    return await Session.getForWorkout(workoutId)
  },


  user: async (parent) => {
    const { userId } = parent
    
    return await User.getById(userId)
  }
}
