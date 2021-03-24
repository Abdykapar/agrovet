const express = require('express')
const router = express.Router()
const isAuth = require('../auth/is-auth')

router.use('/categories', require('../routes/categories-route'))
router.use('/user', isAuth, require('../routes/user.route'))
router.use('/products', require('../routes/product.route'))

module.exports = router