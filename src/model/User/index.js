const methods = require('./methods')

class User {
  static signup = methods.signup
  static login = methods.login
  static getById = methods.getById
}

module.exports = User
