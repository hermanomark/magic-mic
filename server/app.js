const express = require('express')
const mongoose = require('mongoose')
const cardsRouter = require('./controllers/cards')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const cors = require('cors')

const app = express()

app.get('/', (req, res) => {
  res.send('This is the Magic Mic Cards API root endpoint.')
})

mongoose.connect(config.MONGODB_URI, { family: 4 })

app.use(cors())
app.use(express.json())
app.use(middleware.reqLogger)
app.use(middleware.tokenExtractor)
app.use('/api/cards', cardsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.endPointNotFound)
app.use(middleware.errorHandler)

module.exports = app