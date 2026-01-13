const cardsRouter = require('express').Router()

cardsRouter.get('/', (req, res) => {
  // res.send('Cards endpoint')
  res.send('<h1>Magic Mic Cards API</h1><p>Welcome to the Magic Mic Cards API!</p>')
})

module.exports = cardsRouter