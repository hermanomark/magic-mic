const cardsRouter = require('express').Router()
const Card = require('../models/card')

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

cardsRouter.post('/', async (req, res) => {
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
  })

  console.log('Creating card:', card)

  const savedCard = await card.save()
  res.status(201).json(savedCard)
})

cardsRouter.put('/:id', async (req, res) => {
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

  const updatedCard = await Card.findByIdAndUpdate(
    req.params.id,
    {
      playerName,
      teamName,
      series,
      yearReleased,
      ebayUrl,
      imageUrl,
      stock,
      price,
      forSale,
    },
    { new: true, runValidators: true, context: 'query' }
  )

  res.json(updatedCard)
})

cardsRouter.delete('/:id', async (req, res) => {
  await Card.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = cardsRouter