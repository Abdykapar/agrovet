const express = require('express')
const path = require('path')
const router = express.Router()
const newsController = require('../controllers/news.controller')
const multer = require('multer')
const isAuth = require('../auth/is-auth')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })

const multipleUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 5 },
])

/**
 * @typedef News
 * @property {string} title.required
 * @property {integer} description
 * @property {string} image
 */
/**
 * @typedef NewsReturn
 * @property {string} title.required
 * @property {integer} description
 * @property {string} image
 * @property {string} _id
 */
/**
 * This function comment is parsed by doctrine
 * @route GET /api/v1/news
 * @group News
 * @returns {Array.<NewsReturn>} 200 - An array of news info
 * @returns {Error}  default - Unexpected error
 */
/**
 * @route POST /api/v1/news
 * @group News
 * @param {News.model} point.body.required - the new point
 * @returns {object} 200 - An array of news info
 * @returns {Error}  default - Unexpected error
 */

/**
 * @route PUT /api/v1/news/:id
 * @group News
 * @param {string} id.query.required - id: 60392376a9f5ab9bccf6500a
 * @param {News.model} news.body.required - the new news
 * @returns {object} 200 - An array of products info
 * @returns {Error}  default - Unexpected error
 */

/**
 * @route GET /api/v1/news/:id
 * @group News
 * @param {string} id.query.required - id: 60392376a9f5ab9bccf6500a
 * @returns {NewsReturn.model} 200 - An array of news info
 * @returns {Error}  default - Unexpected error
 */

/**
 * @route DELETE /api/v1/news/:id
 * @group News
 * @param {string} id.query.required - id: 60392376a9f5ab9bccf6500a
 * @returns {object} 200 - An array of news info
 * @returns {Error}  default - Unexpected error
 */

router.param('id', newsController.findByParam)

router.route('/').get(newsController.getAll)
router.post('/', multipleUpload, isAuth, newsController.createWithFile)
router.put('/:id', multipleUpload, isAuth, newsController.updateWithFile)
router.delete('/:id', upload.single('image'), isAuth, newsController.deleteOne)

router.route('/:id').get(newsController.getOne)

module.exports = router
