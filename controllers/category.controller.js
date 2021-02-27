const controller = require('../controllers/generatControllers')
const Category = require('../models/category')

module.exports = controller.generateControllers(Category)