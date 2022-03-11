const mongoose = require('mongoose')

const imagesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    unique: false,
  },
  image: {
    type: String,
    required: true,
    unique: false,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
})

module.exports = mongoose.model('Images', imagesSchema)
