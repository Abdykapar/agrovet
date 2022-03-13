const mongoose = require('mongoose')

const Phone = new mongoose.Schema({ name: String })

const addressSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false,
  },
  phones: {
    type: [Phone],
    default: [],
  },
  email: {
    type: String,
    required: false,
  },
})

module.exports = mongoose.model('Address', addressSchema)
