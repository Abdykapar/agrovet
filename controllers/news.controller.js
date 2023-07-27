const controller = require('./generateControllers')
const News = require('../models/news')

module.exports = controller.generateControllers(News)
