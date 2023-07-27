const express = require('express')
const router = express.Router()
const isAuth = require('../auth/is-auth')

router.use('/categories', require('../routes/categories-route'))
router.use('/user', isAuth, require('../routes/user.route'))
router.use('/products', require('../routes/product.route'))
router.use('/images', require('../routes/image.route'))
router.use('/address', require('../routes/address.route'))
router.use('/video', require('../routes/video.route'))
router.use('/news', require('../routes/news.route'))

module.exports = router
