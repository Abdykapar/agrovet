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
  async createWithFile(req, res, next) {
    const body = req.body,
      image = req.file
    let item

    const addressBody = {
      ...body,
      phones: Array.isArray(body.phones)
        ? body.phones.map((i) => ({ name: i }))
        : [{ name: body.phones }],
    }
    try {
      if (image) {
        item = await new Address({
          ...addressBody,
          image: image.filename,
        })
      } else item = await new Address({ ...addressBody })
      await item.save()
      res
        .status(201)
        .json({ message: 'Successfully address created!', status: 'ok' })
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    }
  },
  async updateWithFile(req, res, next) {
    const body = req.body,
      image = req.file,
      id = req.params.id
    let item = await Address.findById(id)

    const addressBody = {
      ...body,
      phones: Array.isArray(body.phones)
        ? body.phones.map((i) => ({ name: i }))
        : [{ name: body.phones }],
    }
    try {
      if (image) {
        await item.updateOne({
          ...addressBody,
          image: image.filename,
        })
      } else item = await item.updateOne({ ...addressBody })
      res
        .status(201)
        .json({ message: 'Successfully address updated!', status: 'ok' })
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    }
  },
})
