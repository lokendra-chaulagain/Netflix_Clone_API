const jwt = require('jsonwebtoken')

function verify(req, res, next) {
  const authHeader = req.headers.token

  //if we gave a token lets split it and get the token
  if (authHeader) {
    const token = authHeader.split(' ')[1]

    //now we have a token lets verify it
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ msg: 'Invalid token' })
      }

      //if token is valid we will add the user to the request
      req.user = user

      //next means go to the actual router
      next()
    })
  } else {
    return res.status(401).json({ msg: 'Unauthorized' })
  }
}

module.exports = verify
