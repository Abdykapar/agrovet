const express = require('express')
const router = express.Router()
const addressController = require('../controllers/address.controller')
const multer = require('multer')
const isAuth = require('../auth/is-auth')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + (file && file.originalname))
  },
})
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1024 },
})

/**
 * @typedef Address
 * @property {string} title.required
 * @property {array} phones
 * @property {string} email
 */
/**
 * @typedef AddressReturn
 * @property {string} title
 * @property {array} phones
 * @property {string} email
 * @property {string} _id
 */
/**
 * This function comment is parsed by doctrine
 * @route GET /api/v1/address
 * @group Address
 * @returns {Array.<AddressReturn>} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */
/**
 * @route POST /api/v1/address
 * @group Address
 * @param {Address.model} point.body.required - the new point
 * @returns {object} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */

/**
 * @route PUT /api/v1/address/:id
 * @group Categories
 * @param {string} id.query.required - id: 60392376a9f5ab9bccf6500a
 * @param {Address.model} point.body.required - the new point
 * @returns {object} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */

/**
 * @route GET /api/v1/address/:id
 * @group Address
 * @param {string} id.query.required - id: 60392376a9f5ab9bccf6500a
 * @returns {AddressReturn.model} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */

/**
 * @route DELETE /api/v1/address/:id
 * @group Address
 * @param {string} id.query.required - id: 60392376a9f5ab9bccf6500a
 * @returns {object} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */
router.param('id', addressController.findByParam)
router.route('/').get(addressController.getAll)
router.post(
  '/',
  upload.single('image'),
  isAuth,
  addressController.createWithFile
)
router.put(
  '/:id',
  upload.single('image'),
  isAuth,
  addressController.updateWithFile
)

router.delete('/:id', isAuth, addressController.deleteOne)
router.route('/:id').get(addressController.getOne)

module.exports = router
