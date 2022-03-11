const controller = require('./generateControllers')
const Images = require('../models/images')

module.exports = controller.generateControllers(Images)
