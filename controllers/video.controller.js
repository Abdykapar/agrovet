const controller = require('./generateControllers')
const Video = require('../models/video')

module.exports = controller.generateControllers(Video)
