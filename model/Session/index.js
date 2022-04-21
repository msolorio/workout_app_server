const methods = require('./methods')

class Session {
  static getMySessions = methods.getMySessions
  static getMySession = methods.getMySession
  static createSession = methods.createSession
  static completeSession = methods.completeSession
  static getForWorkout = methods.getForWorkout
  static getById = methods.getById
  static getDate = methods.getDate
}

module.exports = Session
