const controller = require('./generateControllers')
const Product = require('../models/product')

module.exports = controller.generateControllers(Product, {
  nested: 'category',
  isImages: true,
  getAllWithPopulate: async (req, res, next) => {
    try {
      let q = {};
      if(req.query.categoryId) {
        q.category = req.query.categoryId
      }
      const items = await Product.find(q).populate('category')
      return res.status(200).json(items)
    } catch(err) {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    }
  },
})
