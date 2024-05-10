const { validatorErrorHandler } = require("../../utility/helper")
const Joi = require("joi")

module.exports = {
  fetch: async (req, res, next) => {
    const data = req.params

    const joiObject = {
      id: Joi.string().required().label("Invalid id")
    }

    const { error } = Joi.object(joiObject).validate(data)

    const dataItems = ["id"]
    validatorErrorHandler(error, dataItems, res, next)
  },
  createImage: async (req, res, next) => {
    const data = req.file

    const joiObject = {
      file: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().required()
      }).required().label("Invalid Upload")
    }

    const { error } = Joi.object(joiObject).validate(data)

    const dataItems = ["file"]
    validatorErrorHandler(error, dataItems, res, next)
  },
  createMultiImage: async (req, res, next) => {
    const data = req.files

    const joiObject = {
      files: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().required()
      })).required().label("Invalid Upload")
    }

    const { error } = Joi.object(joiObject).validate(data)

    const dataItems = ["files"]
    validatorErrorHandler(error, dataItems, res, next)
  },
  delete: async (req, res, next) => {
    const data = req.params

    const joiObject = {
      id: Joi.string().required().label("Invalid id")
    }

    const { error } = Joi.object(joiObject).validate(data)

    const dataItems = ["id"]
    validatorErrorHandler(error, dataItems, res, next)
  },
}