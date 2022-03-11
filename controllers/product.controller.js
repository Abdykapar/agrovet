const controller = require('./generateControllers')
const Product = require('../models/product')

module.exports = controller.generateControllers(Product, {
  nested: 'category',
  isImages: true,
})
