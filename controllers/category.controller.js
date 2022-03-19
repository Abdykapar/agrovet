const controller = require('./generateControllers')
const Category = require('../models/category')

module.exports = controller.generateControllers(Category, {
    getChild: async (req, res, next) => {
        try {
            let q = {};
            if(req.query.categoryId) {
              q.parent = req.query.categoryId
            } else{
                q.parent = { $ne: '' }
            }
            const items = await Category.find(q).populate('parent')
            return res.status(200).json(items)
          } catch(err) {
            if (!err.statusCode) {
              err.statusCode = 500
            }
            next(err)
          }
    }
})
