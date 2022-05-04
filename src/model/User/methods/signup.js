const bcrypt = require('bcryptjs')
const prisma = require('../../../prisma')
const createHandledQuery = require('../../../utils/createHandledQuery')
const generateToken = require('../../../utils/generateToken')

async function query(username, password) {
  const existingUser = await prisma.user.findUnique({
    where: { username }
  })

  if (existingUser) {
    return {
      token: null,
      user: null,
      error: 'A user with that username already exists. Please pick another username.'
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { username, password: hashedPassword }
  })

  const { token } = generateToken(user.id)

  return {
    token,
    user
  }
}

const signup = createHandledQuery(query)

module.exports = signup
