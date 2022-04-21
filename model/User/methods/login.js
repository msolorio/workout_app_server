const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client');
const createHandledQuery = require('../../../utils/createHandledQuery')
const prisma = new PrismaClient()

async function query(username, password) {
  const foundUser = await prisma.user.findUnique({ where: { username } })
  if (!foundUser) return { error: 'Invalid credentials' }

  const passwordIsValid = await bcrypt.compare(password, foundUser.password)
  if (!passwordIsValid) return { error: 'Invalid credentials' }

  const token = jwt.sign({ userId: foundUser.id }, process.env.JWT_SECRET)

  return { token, user: foundUser }
}

const login = createHandledQuery(query)

module.exports = login
