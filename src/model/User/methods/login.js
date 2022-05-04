const bcrypt = require('bcryptjs')
const prisma = require('../../../prisma')
const createHandledQuery = require('../../../utils/createHandledQuery')
const generateToken = require('../../../utils/generateToken')

async function query(username, password) {
  const foundUser = await prisma.user.findUnique({ where: { username } })

  if (!foundUser) {
    return {
      error: 'Invalid credentials.',
      token: null,
      user: null
    }
  }

  const passwordIsValid = await bcrypt.compare(password, foundUser.password)
  if (!passwordIsValid) {
    return {
      error: 'Invalid credentials.',
      token: null,
      user: null
    }
  }

  const { token } = generateToken(foundUser.id)

  return {
    error: null,
    token,
    user: foundUser
  }
}

const login = createHandledQuery(query)

module.exports = login
