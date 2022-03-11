const express = require('express')

const router = express.Router()
const imageController = require('../controllers/image.controller')

router.param('id', imageController.findByParam)

router.route('/').get(imageController.getAll).post(imageController.createOne)

router
  .route('/:id')
  .put(imageController.updateOne)
  .delete(imageController.deleteOne)
  .get(imageController.getOne)

module.exports = router
