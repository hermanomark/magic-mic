const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
  playerName: {
    type: String,
    required: true
  },
  teamName: String,
  series: String,
  yearReleased: Number,
  ebayUrl: String,
  imageUrl: String,
  stock: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  forSale: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

cardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Card', cardSchema)