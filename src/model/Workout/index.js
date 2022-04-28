const methods = require('./methods')

class Workout {
  static createWorkout = methods.createWorkout
  static updateWorkout = methods.updateWorkout
  static getMyWorkouts = methods.getMyWorkouts
  static getMyWorkout = methods.getMyWorkout
  static deleteWorkout = methods.deleteWorkout
  
  static getById = methods.getById
}

module.exports = Workout
