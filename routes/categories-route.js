const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller')
const multer = require('multer')
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + file && file.originalname)
	}
})
const upload = multer({ storage: storage});

/**
 * @typedef Category
 * @property {string} title.required
 * @property {string} parent
 * @property {string} image
 */
/**
 * @typedef CategoryReturn
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
 * @returns {Array.<CategoryReturn>} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */
/**
 * @route POST /api/v1/categories
 * @group Categories
 * @param {Category.model} point.body.required - the new point
 * @returns {object} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */

 /**
 * @route PUT /api/v1/categories/:id
 * @group Categories
 * @param {string} id.query.required - id: 60392376a9f5ab9bccf6500a
 * @param {Category.model} point.body.required - the new point
 * @returns {object} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */

 /**
 * @route GET /api/v1/categories/:id
 * @group Categories
 * @param {string} id.query.required - id: 60392376a9f5ab9bccf6500a
 * @returns {CategoryReturn.model} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */

 /**
 * @route GET /api/v1/categories/parent
 * @group Categories
 * @returns {CategoryReturn.model} 200 - An array of categories parent info
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
router.get('/sub', categoryController.getChild)
router.put('/:id', upload.single('image'), categoryController.updateWithFile)

router.route('/:id')
    .delete(categoryController.deleteOne)
    .get(categoryController.getOne)

module.exports = router