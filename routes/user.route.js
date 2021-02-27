const express = require('express')

const router = express.Router()
const userController = require('../controllers/user.controller')

router.param('id', userController.findByParam)

router.route('/')
    .get(userController.getAll)
    .post(userController.createOne)

router.route('/:id')
    .put(userController.updateOne)
    .delete(userController.deleteOne)
    .get(userController.getOne)

module.exports = router