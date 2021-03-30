const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    parent: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Category', categorySchema)