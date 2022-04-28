const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../../../prisma')
const createHandledQuery = require('../../../utils/createHandledQuery')


async function query(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { username, password: hashedPassword }
  })

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

  return { token, user }
}

const signup = createHandledQuery(query)

module.exports = signup
