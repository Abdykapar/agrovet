const controllers = {
    async createOne(model, body) {
        const item = await new model(body)
        return await item.save()
    },

    async createWithFile(model, body, file) {
        const item = await new model({ ...body, image: file.filename })
        return await item.save()
    },

    async getFile(model, fileId) {
        const item = await new model({ title: body.title, parent: body.parent, image: file.filename })
        return await item.save()
    },

    async updateOne(docToUpdate, update) {
        await docToUpdate.updateOne(update)
        return { message: 'Success', status: 'ok' }
    },

    async deleteOne (docToDelete) {
        await docToDelete.deleteOne()
        return { message: 'Success', status: 'ok' }
    },

    getOne(docToGet) {
        return Promise.resolve(docToGet)
    },

    async getAll(model, parent) {
        if (parent) {
            return await model.find({parent: parent})
        }
        return await model.find()
    },

    async getParent(model) {
        return await model.find({parent: ''})
    },

    async getAllWithPopulate(model, nested) {
        return await model.find().populate(nested)
    },

    async findByParam(model, id) {
        return await model.findById(id)
    },
}

const createOne = (model) => (req, res, next) => {
    return controllers.createOne(model, req.body)
        .then(result => res.json(result))
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}

const createWithFile = (model) => (req, res, next) => {
    return controllers.createWithFile(model, req.body, req.file)
        .then(result => res.json(result))
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}

const updateOne = (model) => (req, res, next) => {
    const docToUpdate = req.docFromId
    const update = req.body

    return controllers.updateOne(docToUpdate, update)
        .then(doc => res.status(201).json(doc))
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}

const deleteOne = (model) => (req, res, next) => {
    return controllers.deleteOne(req.docFromId)
        .then(doc => res.status(201).json(doc))
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}

const getOne = (model) => (req, res, next) => {
    return controllers.getOne(req.docFromId)
        .then(doc => res.status(200).json(doc))
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}

const getAll = (model) => (req, res, next) => {
    return controllers.getAll(model, req.query.parent)
        .then(docs => res.json(docs))
        .catch(err => next(err))
}

const getParent = (model) => (req, res, next) => {
    return controllers.getParent(model)
        .then(docs => res.json(docs))
        .catch(err => next(err))
}

const getAllWithPopulate = (model) => (req, res, next) => {
    return controllers.getAll(model)
        .then(docs => res.json(docs))
        .catch(err => next(err))
}

const findByParam = (model) => (req, res, next, id) => {
    return controllers.findByParam(model, id)
        .then(doc => {
            if (!doc) {
                next(new Error('Not Found Error'))
            } else {
                req.docFromId = doc
                next()
            }
        }).catch(err => next(err))
}

const findByFile = (model) => (req, res, next) => {
    return res.sendFile(`${appRoot}/uploads/${req.params.fileName}`)
}

const generateControllers = (model, overrides = {}) => {
    const defaults = {
        findByParam: findByParam(model),
        getAll: getAll(model),
        getParent: getParent(model),
        getOne: getOne(model),
        createOne: createOne(model),
        updateOne: updateOne(model),
        deleteOne: deleteOne(model),
        createWithFile: createWithFile(model),
        findByFile: findByFile(model)
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
    generateControllers
}