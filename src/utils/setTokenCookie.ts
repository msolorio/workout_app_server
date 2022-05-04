interface ContextType {
  res: {
    cookie: (cookieName: string, value: string, config: {
      httpOnly: boolean,
      maxAge: number
    }) => void
  }
}

function setTokenCookie(context: ContextType, token: string): void {
  context.res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  })
}

module.exports = setTokenCookie
