const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller')
const multer = require('multer')
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + file.originalname)
	}
})
const upload = multer({ storage: storage});

/**
 * @typedef Point
 * @property {string} title.required
 * @property {string} parent
 * @property {string} image
 */
/**
 * @typedef PointReturn
 * @property {string} title
 * @property {string} parent
 * @property {string} image
 * @property {string} _id
 */
/**
 * This function comment is parsed by doctrine
 * @route GET /api/v1/categories
 * @group Categories
 * @param {string} parent.query - parent: 60392376a9f5ab9bccf6500a
 * @returns {Array.<PointReturn>} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */
/**
 * @route POST /api/v1/categories
 * @group Categories
 * @param {Point.model} point.body.required - the new point
 * @returns {object} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */

 /**
 * @route PUT /api/v1/categories/:id
 * @group Categories
 * @param {string} id.query.required - id: 60392376a9f5ab9bccf6500a
 * @param {Point.model} point.body.required - the new point
 * @returns {object} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */

 /**
 * @route GET /api/v1/categories/:id
 * @group Categories
 * @param {string} id.query.required - id: 60392376a9f5ab9bccf6500a
 * @returns {PointReturn.model} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */

 /**
 * @route GET /api/v1/categories/parent
 * @group Categories
 * @returns {PointReturn.model} 200 - An array of categories parent info
 * @returns {Error}  default - Unexpected error
 */

 /**
 * @route DELETE /api/v1/categories/:id
 * @group Categories
 * @param {string} id.query.required - id: 60392376a9f5ab9bccf6500a
 * @returns {object} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */
router.param('id', categoryController.findByParam)
router.route('/')
    .get(categoryController.getAll)
router.post('/', upload.single('image'), categoryController.createWithFile)
router.get('/file/:fileName', categoryController.findByFile)
router.get('/parent', categoryController.getParent)

router.route('/:id')
    .put(categoryController.updateOne)
    .delete(categoryController.deleteOne)
    .get(categoryController.getOne)

module.exports = router