const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

function verify(req, res, next) {
  const authHeader = req.headers.token

  //we gave token with Bearer lets split it and get the token only
  if (authHeader) {
    const token = authHeader.split(' ')[1]

    //now we have a token lets verify it
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ msg: 'Invalid token' })
      }
      req.user = user
      next()
    })
  } else {
    return res.status(401).json({ msg: 'Unauthorized' })
  }
}

module.exports = verify
