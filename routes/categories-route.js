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

router.param('id', categoryController.findByParam)

router.route('/')
    .get(categoryController.getAll)
router.post('/', upload.single('image'), categoryController.createWithFile)
router.get('/file/:fileName', categoryController.findByFile)

// router.route('/:id')
//     .put(categoryController.updateOne)
//     .delete(categoryController.deleteOne)
//     .get(categoryController.getOne)

module.exports = router