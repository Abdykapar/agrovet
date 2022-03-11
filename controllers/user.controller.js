const controller = require('./generateControllers')
const User = require('../models/user')

module.exports = controller.generateControllers(User)
