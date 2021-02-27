const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
})

module.exports = mongoose.model('Product', productSchema)