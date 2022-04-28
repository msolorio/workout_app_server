const mdl = require('../model')

// const { WorkoutType } = require('../model/types')

module.exports = {
  exercises: async (parent) => {
    const workoutId = parent.id

    return await mdl.Exercise.getForWorkout(workoutId)
  },


  sessions: async (parent) => {
    const workoutId = parent.id

    return await mdl.Session.getForWorkout(workoutId)
  },

  user: async (parent) => {
    const { userId } = parent
    
    return await mdl.User.getById(userId)
  }
}
