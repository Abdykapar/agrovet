const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
  },
})

module.exports = mongoose.model('News', newsSchema)
