const express = require('express')
const cardsRouter = require('./controllers/cards')

const app = express()

app.use(express.json())
app.use('/api/cards', cardsRouter)

module.exports = app