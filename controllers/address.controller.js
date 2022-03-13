const controller = require('./generateControllers')
const Address = require('../models/address')

module.exports = controller.generateControllers(Address, {
  updateOne: (req, res, next) => {
    const docToUpdate = req.docFromId
    const update = req.body

    docToUpdate
      .updateOne(update)
      .then(() =>
        res.status(201).json({ message: 'Success address', status: 'ok' })
      )
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500
        }
        next(err)
      })
  },
})
