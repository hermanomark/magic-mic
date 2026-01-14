const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const reqLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---------')
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  } else {
    req.token = null
  }

  next()
}

const userExtractor = async (req, res, next) => {
  const token = req.token

  if (!token) {
    return res.status(401).json({ error: 'token is missing' })
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token is missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return res.status(401).json({ error: 'user is missing' })
  }

  req.user = user

  next()
}

const endPointNotFound = (req, res) => {
  res.status(404).send({ error: 'Endpoint no found' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({ error: 'Expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' })
  }

  next(error)
}

module.exports = {
  reqLogger,
  endPointNotFound,
  errorHandler,
  tokenExtractor,
  userExtractor
}