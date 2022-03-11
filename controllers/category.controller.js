const controller = require('./generateControllers')
const Category = require('../models/category')

module.exports = controller.generateControllers(Category)
