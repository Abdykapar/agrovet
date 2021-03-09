const controller = require('../controllers/generatControllers')
const Product = require('../models/product')

module.exports = controller.generateControllers(Product, { nested: 'category' })