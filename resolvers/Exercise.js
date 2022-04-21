const {
  Workout,
  ExerciseInstance
} = require('../model')


module.exports = {
  workout: async (parent) => {
    const { workoutId } = parent

    return await Workout.getById(workoutId)
  },


  exerciseInstances: async (parent) => {
    const exerciseId = parent.id
    
    return await ExerciseInstance.getForExercise(exerciseId)
  }
}
