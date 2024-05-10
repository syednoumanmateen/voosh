const constants = require("../constants")
const statusCode = require("../statusCode")
const response = require("../response")
const Joi = require("joi")

module.exports = {
  generateTime: async (setTime) => {
    return new Promise((resolve, reject) => {
      try {
        const currentTime = new Date();
        const expiryTime = new Date(currentTime.getTime() + setTime);

        resolve(expiryTime)
      } catch (e) {
        reject(e)
      }
    })
  },
  validateTime: async (time) => {
    return new Promise((resolve, reject) => {
      try {
        const currentTime = new Date();
        const expiryTime = new Date(currentTime.getTime());

        if (time >= expiryTime) {
          resolve(true)
        }
        reject(false)
      } catch (e) {
        reject(e);
      }
    })
  },
  validatorErrorHandler: async (error, items, res, next) => {
    if (error) {
      let displayMessage = error.details[0].context.label;
      let errorMessage = error.details[0].message;
      if (items.includes(displayMessage) || error.details[0].type === "object.allowUnknown") {
        displayMessage = constants.badRequestMessage;
      }
      if (!errorMessage) {
        errorMessage = constants.unknownErrorMessage;
      }
      return res.status(statusCode.BAD_REQUEST).send(response.errorWith(statusCode.BAD_REQUEST, errorMessage, displayMessage, statusCode.INVALID_FIELD_VALUES));
    } else {
      next();
    }
  }
}