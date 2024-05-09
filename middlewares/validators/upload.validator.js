const { validatorErrorHandler, objectIdSchema } = require("../../utility/helper")
const Joi = require("joi")

module.exports = {
  fetch: async (req, res, next) => {
    const data = req.params

    const joiObject = {
      _id: objectIdSchema().required().label("Invalid _id")
    }

    const { error } = Joi.object(joiObject).validate(data)

    const dataItems = ["_id"]
    validatorErrorHandler(error, dataItems, res, next)
  },
  createImage: async (req, res, next) => {
    const data = req.params

    const joiObject = {
      file: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().required(),
        size: Joi.number().required()
      }).required().label("Invalid Upload")
    }

    const { error } = Joi.object(joiObject).validate(data)

    const dataItems = ["file"]
    validatorErrorHandler(error, dataItems, res, next)
  },
  createMultiImage: async (req, res, next) => {
    const data = req.params

    const joiObject = {
      files: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().required(),
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
      _id: objectIdSchema().required().label("Invalid _id")
    }

    const { error } = Joi.object(joiObject).validate(data)

    const dataItems = ["_id"]
    validatorErrorHandler(error, dataItems, res, next)
  },
}