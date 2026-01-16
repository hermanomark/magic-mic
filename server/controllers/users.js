const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length < 4) {
    return response.status(400).json({ error: 'Password must be at least 4 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('cards', {
      playerName: 1,
      teamName: 1,
      series: 1,
      yearReleased: 1,
      ebayUrl: 1,
      imageUrl: 1,
      stock: 1,
      price: 1,
      forSale: 1, })
  response.json(users)
})

usersRouter.get('/:username', async (request, response) => {
  const user = await User
    .findOne({ username: request.params.username }).populate('cards', {
      playerName: 1,
      teamName: 1,
      series: 1,
      yearReleased: 1,
      ebayUrl: 1,
      imageUrl: 1,
      stock: 1,
      price: 1,
      forSale: 1, })
  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

module.exports = usersRouter