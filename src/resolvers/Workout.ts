const mdl = require('../model')

interface WorkoutType {
  id: number
  userId: number
}

module.exports = {
  exercises: async (parent: WorkoutType) => {
    const workoutId = parent.id

    return await mdl.Exercise.getForWorkout(workoutId)
  },


  sessions: async (parent: WorkoutType) => {
    const workoutId = parent.id

    return await mdl.Session.getForWorkout(workoutId)
  },

  user: async (parent: WorkoutType) => {
    const { userId } = parent
    
    return await mdl.User.getById(userId)
  }
}
