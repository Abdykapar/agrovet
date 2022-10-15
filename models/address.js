const mongoose = require('mongoose')

const Phone = new mongoose.Schema({ name: String })

const addressSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    unique: false,
  },
  owner: {
    type: String,
    default: '',
  },
  region: {
    type: String,
    default: '',
  },
  position: {
    type: String,
    default: '',
  },
  phones: {
    type: [Phone],
    default: [],
  },
  email: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
})

module.exports = mongoose.model('Address', addressSchema)
