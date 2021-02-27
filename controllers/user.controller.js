const controller = require('../controllers/generatControllers')
const User = require('../models/user')

module.exports = controller.generateControllers(User)