const controller = require('./generateControllers')
const Product = require('../models/product')

module.exports = controller.generateControllers(Product, {
  nested: 'category',
  isImages: true,
  getAllWithPopulate: async (req, res, next) => {
    try {
      let q = {}
      if (req.query.categoryId) {
        q.category = req.query.categoryId
      }
      const items = await Product.find(q).populate('category')
      return res.status(200).json(items)
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    }
  },
  search: async (req, res, next) => {
    try {
      const { page = 1, limit = 10, s = '' } = req.query
      const r = { $regex: s, $options: 'i' }
      const query = {
        $or: [
          { title: r },
          { description: r },
          { activeIngredient: r },
          { methodEntry: r },
          { chemicalClass: r },
          { preparationForm: r },
          { dangerClass: r },
          { consist: r },
          { fluid: r },
        ],
      }
      const items = await Product.find(query)
        .populate({
          path: 'category',
          model: 'Category',
          populate: {
            path: 'parent',
            model: 'Category',
          },
        })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec()
      const count = await Product.countDocuments(query)

      return res.status(200).json({
        items,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalElements: count,
        perPage: limit,
      })
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    }
  },
})
