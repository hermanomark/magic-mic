const cardsRouter = require('express').Router()
const Card = require('../models/card')
const middleware = require('../utils/middleware')

cardsRouter.get('/', async (req, res) => {
  const cards = await Card.find({})
  res.json(cards)
})

cardsRouter.get('/:id', async (req, res) => {
  const card = await Card.findById(req.params.id)
  if (card) {
    res.json(card)
  } else {
    res.status(404).end()
  }
})

cardsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const {
    playerName,
    teamName,
    series,
    yearReleased,
    ebayUrl,
    imageUrl,
    stock,
    price,
    forSale,
  } = req.body

  const user = req.user

  const card = new Card({
    playerName,
    teamName,
    series,
    yearReleased,
    ebayUrl,
    imageUrl,
    stock,
    price,
    forSale,
    user: user._id,
  })

  const savedCard = await card.save()
  user.cards = user.cards.concat(savedCard._id)
  await user.save()

  res.status(201).json(savedCard)
})

cardsRouter.put('/:id', middleware.userExtractor, async (req, res) => {
  const cardToUpdate = await Card.findById(req.params.id)
  const user = req.user

  if (!cardToUpdate) {
    return res.status(404).json({ error: 'card not found' })
  }

  if (cardToUpdate.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'only the creator can update its own card' })
  }

  cardToUpdate.playerName = req.body.playerName || cardToUpdate.playerName
  cardToUpdate.teamName = req.body.teamName || cardToUpdate.teamName
  cardToUpdate.series = req.body.series || cardToUpdate.series
  cardToUpdate.yearReleased = req.body.yearReleased || cardToUpdate.yearReleased
  cardToUpdate.ebayUrl = req.body.ebayUrl || cardToUpdate.ebayUrl
  cardToUpdate.imageUrl = req.body.imageUrl || cardToUpdate.imageUrl
  cardToUpdate.stock = req.body.stock !== undefined ? req.body.stock : cardToUpdate.stock
  cardToUpdate.price = req.body.price !== undefined ? req.body.price : cardToUpdate.price
  cardToUpdate.forSale = req.body.forSale !== undefined ? req.body.forSale : cardToUpdate.forSale

  const updatedCard = await cardToUpdate.save()
  res.json(updatedCard)
})

cardsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const user = req.user

  const cardToDelete = await Card.findById(req.params.id)

  if (!cardToDelete) {
    return res.status(404).json({ error: 'card not found' })
  }

  if (cardToDelete.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'only the creator can delete a card' })
  }

  await Card.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = cardsRouter