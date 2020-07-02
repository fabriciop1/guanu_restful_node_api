const JWT = require('jsonwebtoken')
const AUTHCONFIG = require('../../config/auth.json')

module.exports = (req, res, next) => {
  let authHeader = req.headers.authorization

  if(!authHeader) {
    return res.status(401).send({ error: "No token provided." })
  }

  let parts = authHeader.split(' ')
  if(!parts.length === 2) {
    return res.status(401).send({ error: 'Token error' })
  }

  let [scheme, token] = parts
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({error: 'Token malformed'})
  }

  JWT.verify(token, AUTHCONFIG.secret, (err, decoded) => {
    if (err) return res.status(401).send({error: 'Invalid token.'})

    req.freelancerId = decoded.id
    return next()
  })
}