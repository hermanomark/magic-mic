const express = require('express')
const mongoose = require('mongoose')
const cardsRouter = require('./controllers/cards')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const app = express()

app.get('/', (req, res) => {
  res.send('This is the Magic Mic Cards API root endpoint.')
})

mongoose.connect(config.MONGODB_URI, { family: 4 })

app.use(express.json())
app.use(middleware.reqLogger)
app.use('/api/cards', cardsRouter)

app.use(middleware.endPointNotFound)
app.use(middleware.errorHandler)

module.exports = app