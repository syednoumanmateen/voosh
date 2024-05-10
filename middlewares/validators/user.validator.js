const { validatorErrorHandler } = require("../../utility/helper")
const Joi = require("joi")

module.exports = {
  signUp: async (req, res, next) => {
    const data = req.body

    const joiObject = {
      name: Joi.string().required().label("Invalid Name"),
      email: Joi.string().email().required().label("Invalid Email"),
      password: Joi.string().required().max(8).label("Invalid Password"),
      gender: Joi.string().required().valid("male", "female").label("Invalid Gender"),
      profile: Joi.string().optional().label("Invalid Profile"),
    }

    const { error } = Joi.object(joiObject).validate(data)

    const dataItems = ["name", "email", "password", "gender", "profile"]
    validatorErrorHandler(error, dataItems, res, next)
  },
  signIn: async (req, res, next) => {
    const data = req.body

    const joiObject = {
      email: Joi.string().email().required().label("Invalid Email"),
      password: Joi.string().required().max(8).label("Invalid Password")
    }

    const { error } = Joi.object(joiObject).validate(data)

    const dataItems = ["email", "password"]
    validatorErrorHandler(error, dataItems, res, next)
  },
  forgotPassword: async (req, res, next) => {
    const data = req.body

    const joiObject = {
      email: Joi.string().email().required().label("Invalid Email")
    }

    const { error } = Joi.object(joiObject).validate(data)

    const dataItems = ["email"]
    validatorErrorHandler(error, dataItems, res, next)
  },
  resetPassword: async (req, res, next) => {
    const data = req.body

    const joiObject = {
      resetToken: Joi.string().required().label("Invalid Reset Token"),
      password: Joi.string().required().max(8).label("Invalid Password")
    }

    const { error } = Joi.object(joiObject).validate(data)

    const dataItems = ["resetToken", "password"]
    validatorErrorHandler(error, dataItems, res, next)
  },
  reload: async (req, res, next) => {
    const data = req.body

    const joiObject = {
      token: Joi.string().required().label("Invalid Token")
    }

    const { error } = Joi.object(joiObject).validate(data)

    const dataItems = ["token"]
    validatorErrorHandler(error, dataItems, res, next)
  },
  update: async (req, res, next) => {
    const data = req.body

    const joiObject = {
      name: Joi.string().label("Invalid Name"),
      email: Joi.string().email().label("Invalid Email"),
      gender: Joi.string().valid("male", "female").label("Invalid Gender"),
      profile: Joi.string().optional().label("Invalid Profile"),
      role: Joi.string().valid("admin", "user").label("Invalid RobjectIdSchemaole"),
      isPublicProfile: Joi.boolean().label("Invalid Is Public Profile"),
    }

    const { error } = Joi.object(joiObject).validate(data)

    const dataItems = ["name", "email", "password", "gender", "profile", "role", "isPublicProfile"]
    validatorErrorHandler(error, dataItems, res, next)
  }
}