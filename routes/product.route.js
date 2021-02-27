const express = require('express')

const router = express.Router()
const productController = require('../controllers/product.controller')
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

router.param('id', productController.findByParam)

router.route('/')
	.get(productController.getAll)
router.post('/', upload.single('image'), productController.createWithFile)

router.route('/:id')
	.put(productController.updateOne)
	.delete(productController.deleteOne)
	.get(productController.getOne)

module.exports = router