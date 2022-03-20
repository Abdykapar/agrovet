const express = require('express')
const router = express.Router()
const videoController = require('../controllers/video.controller')
const isAuth = require('../auth/is-auth')

/**
 * @typedef Video
 * @property {string} title.required
 * @property {string} url.required
 */
/**
 * @typedef VideoReturn
 * @property {string} title
 * @property {string} url
 * @property {string} _id
 */
/**
 * This function comment is parsed by doctrine
 * @route GET /api/v1/video
 * @group Video
 * @returns {Array.<VideoReturn>} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */
/**
 * @route POST /api/v1/video
 * @group Video
 * @param {Video.model} point.body.required - the new point
 * @returns {object} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */

/**
 * @route PUT /api/v1/video/:id
 * @group Categories
 * @param {string} id.query.required - id: 60392376a9f5ab9bccf6500a
 * @param {Video.model} point.body.required - the new point
 * @returns {object} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */

/**
 * @route GET /api/v1/video/:id
 * @group Video
 * @param {string} id.query.required - id: 60392376a9f5ab9bccf6500a
 * @returns {VideoReturn.model} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */

/**
 * @route DELETE /api/v1/video/:id
 * @group Video
 * @param {string} id.query.required - id: 60392376a9f5ab9bccf6500a
 * @returns {object} 200 - An array of categories info
 * @returns {Error}  default - Unexpected error
 */
router.param('id', videoController.findByParam)
router.route('/').get(videoController.getAll)
router.post('/', isAuth, videoController.createOne)
router.put('/:id', isAuth, videoController.updateOne)

router.delete('/:id', isAuth, videoController.deleteOne)
router.route('/:id').get(videoController.getOne)

module.exports = router
