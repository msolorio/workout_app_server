const methods = require('./methods')

class Exercise {
  static createExercise = methods.createExercise
  static deleteExercise = methods.deleteExercise
  static getForWorkout = methods.getForWorkout
  static getById = methods.getById
}

module.exports = Exercise
