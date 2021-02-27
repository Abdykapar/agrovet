const express = require('express')
const router = express.Router()

router.use('/categories', require('../routes/categories-route'))
router.use('/user', require('../routes/user.route'))
router.use('/products', require('../routes/product.route'))

module.exports = router