const fs = require('fs')
const Images = require('../models/images')

const controllers = {
  async createOne(model, body) {
    const item = await new model(body)
    return await item.save()
  },

  async createWithFile(model, body, files) {
    let item
    if (files) {
      const { image, images } = files
      item = await new model({
        ...body,
        image: image && image.length ? image[0].filename : '',
      })
      if (images && images.length) {
        for (let i of images) {
          const img = await new Images({
            title: i.filename,
            image: i.filename,
            product: item._id,
          })
          await img.save()
        }
      }
    } else item = await new model({ ...body })
    return await item.save()
  },

  async getFile(model, fileId) {
    const item = await model.find({ image: fileId })
    return await item.save()
  },

  async updateOne(docToUpdate, update) {
    await docToUpdate.updateOne(update)
    return { message: 'Success', status: 'ok' }
  },

  async updateWithFile(docToUpdate, update, files) {
    if (files) {
      const { image, images } = files
      if (image && image.length && docToUpdate.image) {
        fs.unlink('uploads/' + docToUpdate.image, (err) => {
          console.error(err)
        })
      }
      await docToUpdate.updateOne({
        ...update,
        image: image && image.length ? image[0].filename : '',
      })
      if (images && images.length) {
        for (let i of images) {
          const img = await new Images({
            title: i.filename,
            image: i.filename,
            product: docToUpdate._id,
          })
          await img.save()
        }
      }
    } else await docToUpdate.updateOne(update)
    return { message: 'Success', status: 'ok' }
  },

  async deleteOne(docToDelete) {
    if (docToDelete.image) {
      fs.unlink('uploads/' + docToDelete.image, (err) => {
        console.error(err)
      })
    }
    await docToDelete.deleteOne()
    return { message: 'Success', status: 'ok' }
  },

  async getOne(docToGet, isImages) {
    let images = []
    if (isImages) {
      images = await Images.find({ product: docToGet._id })
      docToGet = { ...docToGet._doc, images }
    }
    return Promise.resolve(docToGet)
  },

  async getAll(model, parent) {
    if (parent) {
      return await model.find({ parent: parent })
    }
    return await model.find()
  },

  async getParent(model) {
    return await model.find({ parent: '' })
  },

  async getChild(model) {
    return await model.find({ parent: { $ne: '' } }).populate('parent')
  },

  async getAllWithPopulate(model, nested, isImages) {
    return await model.find().populate(nested)
  },

  async findByParam(model, id) {
    return await model.findById(id)
  },
}

const createOne = (model) => (req, res, next) => {
  return controllers
    .createOne(model, req.body)
    .then((result) => res.json(result))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

const createWithFile = (model) => (req, res, next) => {
  return controllers
    .createWithFile(model, req.body, req.files)
    .then((result) => res.json(result))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

const updateOne = (model) => (req, res, next) => {
  const docToUpdate = req.docFromId
  const update = req.body

  return controllers
    .updateOne(docToUpdate, update)
    .then((doc) => res.status(201).json(doc))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

const updateWithFile = (model) => (req, res, next) => {
  const docToUpdate = req.docFromId
  const update = req.body

  return controllers
    .updateWithFile(docToUpdate, update, req.file)
    .then((doc) => res.status(201).json(doc))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

const deleteOne = (model) => (req, res, next) => {
  return controllers
    .deleteOne(req.docFromId)
    .then((doc) => res.status(201).json(doc))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

const getOne = (model, isImages) => (req, res, next) => {
  return controllers
    .getOne(req.docFromId, isImages)
    .then((doc) => res.status(200).json(doc))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

const getAll = (model) => (req, res, next) => {
  return controllers
    .getAll(model, req.query.parent)
    .then((docs) => res.json(docs))
    .catch((err) => next(err))
}

const getParent = (model) => (req, res, next) => {
  return controllers
    .getParent(model)
    .then((docs) => res.json(docs))
    .catch((err) => next(err))
}

const getChild = (model) => (req, res, next) => {
  return controllers
    .getChild(model)
    .then((docs) => res.json(docs))
    .catch((err) => next(err))
}

const getAllWithPopulate = (model, nested, images) => (req, res, next) => {
  return controllers
    .getAllWithPopulate(model, nested, images)
    .then((docs) => res.json(docs))
    .catch((err) => next(err))
}

const findByParam = (model) => (req, res, next, id) => {
  return controllers
    .findByParam(model, id)
    .then((doc) => {
      if (!doc) {
        next(new Error('Not Found Error'))
      } else {
        req.docFromId = doc
        next()
      }
    })
    .catch((err) => next(err))
}

const findByFile = (model) => (req, res, next) => {
  return res.sendFile(`${appRoot}/uploads/${req.params.fileName}`)
}

const generateControllers = (model, overrides = {}) => {
  const defaults = {
    findByParam: findByParam(model),
    getAll: getAll(model),
    getAllWithPopulate: getAllWithPopulate(
      model,
      overrides.nested,
      overrides.isImages
    ),
    getParent: getParent(model),
    getChild: getChild(model),
    getOne: getOne(model, overrides.isImages),
    createOne: createOne(model),
    updateOne: updateOne(model),
    deleteOne: deleteOne(model),
    createWithFile: createWithFile(model),
    findByFile: findByFile(model),
    updateWithFile: updateWithFile(model),
  }

  return { ...defaults, ...overrides }
}

module.exports = {
  controllers,
  createOne,
  updateOne,
  getAll,
  getOne,
  findByParam,
  createWithFile,
  findByFile,
  generateControllers,
}
