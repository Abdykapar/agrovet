const express = require('express')
const path = require('path')
const router = express.Router()
const productController = require('../controllers/product.controller')
const multer = require('multer')
const isAuth = require('../auth/is-auth')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() +  path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })

const multipleUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 5 },
])

/**
 * @typedef Point
 * @property {string} title.required
 * @property {integer} price
 * @property {integer} weight
 * @property {string} image
 * @property {string} images
 * @property {string} description.required
 * @property {string} category.required
 */
/**
 * @typedef PointReturn
 * @property {string} title.required
 * @property {integer} price
 * @property {integer} weight
 * @property {string} image
 * @property {string} images
 * @property {string} description.required
 * @property {string} category.required
 * @property {string} _id
 */
/**
 * This function comment is parsed by doctrine
 * @route GET /api/v1/products
 * @group Products
 * @returns {Array.<PointReturn>} 200 - An array of products info
 * @returns {Error}  default - Unexpected error
 */
/**
 * @route POST /api/v1/products
 * @group Products
 * @param {Point.model} point.body.required - the new point
 * @returns {object} 200 - An array of product info
 * @returns {Error}  default - Unexpected error
 */

/**
 * @route PUT /api/v1/products/:id
 * @group Products
 * @param {string} id.query.required - id: 60392376a9f5ab9bccf6500a
 * @param {Point.model} point.body.required - the new point
 * @returns {object} 200 - An array of products info
 * @returns {Error}  default - Unexpected error
 */

/**
 * @route GET /api/v1/products/:id
 * @group Products
 * @param {string} id.query.required - id: 60392376a9f5ab9bccf6500a
 * @returns {PointReturn.model} 200 - An array of products info
 * @returns {Error}  default - Unexpected error
 */

/**
 * @route DELETE /api/v1/products/:id
 * @group Products
 * @param {string} id.query.required - id: 60392376a9f5ab9bccf6500a
 * @returns {object} 200 - An array of products info
 * @returns {Error}  default - Unexpected error
 */

router.param('id', productController.findByParam)

router.route('/').get(productController.getAllWithPopulate)
router.post('/', multipleUpload, isAuth, productController.createWithFile)
router.put('/:id', multipleUpload, isAuth, productController.updateWithFile)
router.delete(
  '/:id',
  upload.single('image'),
  isAuth,
  productController.deleteOne
)

router.route('/:id').get(productController.getOne)

module.exports = router
