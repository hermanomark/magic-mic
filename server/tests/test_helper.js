const Card = require('../models/card')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const initialCards = [
  {
    playerName: 'Mike Trout',
    teamName: 'Los Angeles Angels',
    series: 'Topps Chrome',
    yearReleased: 2011,
    ebayUrl: 'https://ebay.com/trout',
    imageUrl: 'https://example.com/trout.jpg',
    stock: 5,
    price: 1500,
    forSale: true
  },
  {
    playerName: 'Shohei Ohtani',
    teamName: 'Los Angeles Dodgers',
    series: 'Bowman Chrome',
    yearReleased: 2018,
    ebayUrl: 'https://ebay.com/ohtani',
    imageUrl: 'https://example.com/ohtani.jpg',
    stock: 3,
    price: 2000,
    forSale: true
  }
]

const nonExistingId = async () => {
  const card = new Card({
    playerName: 'Temporary',
    teamName: 'Temporary Team',
    series: 'Temporary Series',
    yearReleased: 2020
  })
  await card.save()
  await card.deleteOne()

  return card._id.toString()
}

const cardsInDb = async () => {
  const cards = await Card.find({})
  return cards.map(card => card.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const createTestUser = async () => {
  const passwordHash = await bcrypt.hash('testpassword', 10)
  const user = new User({
    username: 'testuser',
    name: 'Test User',
    passwordHash
  })

  const savedUser = await user.save()
  return savedUser
}

const getTokenForUser = (userId) => {
  const userForToken = {
    username: 'testuser',
    id: userId
  }

  return jwt.sign(userForToken, process.env.JWT_SECRET)
}

module.exports = {
  initialCards,
  nonExistingId,
  cardsInDb,
  usersInDb,
  createTestUser,
  getTokenForUser
}
