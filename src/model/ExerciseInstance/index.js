const methods = require('./methods')

class ExerciseInstance {
  static updateSetForExInstance = methods.updateSetForExInstance
  static getForSession = methods.getForSession
  static getForExercise = methods.getForExercise
}

module.exports = ExerciseInstance
