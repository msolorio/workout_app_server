const methods = require('./methods')

class Workout {
  // constructor(args) {
  //   name = args.name
  //   description = args.description
  //   length = args.length
  //   location = args.location
  //   exercises = args.exercises
  //   sessions = args.sessions
  //   user = args.user
  // }

  static createWorkout = methods.createWorkout
}

module.exports = Workout