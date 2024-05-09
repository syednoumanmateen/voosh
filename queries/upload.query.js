const mongoose = require("mongoose")
const constants = require("../constants")
const customException = require("../customException")
const statusCode = require("../statusCode")
const Upload = require("../models/upload.model")
const imageUpload = require("../utility/imageUpload")

module.exports = {
  fetchImageById: async (id) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const result = await Upload.findOne({ _id: objectId })

      if (result) {
        const obj = result.toObject()
        obj.upload = await imageUpload.bufferToUrl(obj.upload.data)
        return obj.upload
      }
      throw customException.error(statusCode.NOT_FOUND, "Image not found", "Image not found")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  addImage: async (data) => {
    try {
      const result = await Upload.create(data)
      if (result) {
        return result._id
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to add image", "Failed to add image")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  addMultiImage: async (data) => {
    try {
      const result = await Upload.insertMany(data)
      if (result && result.length) {
        return result.map(i => i._id)
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to add images", "Failed to add images")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  },
  deleteImage: async (id) => {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const result = await Upload.findOneAndDelete({ _id: objectId })
      if (result) {
        return result
      }
      throw customException.error(statusCode.SERVER_ERROR, "Failed to delete image", "Failed to delete image")
    } catch (e) {
      if (e instanceof customException.customException) throw e;
      throw customException.error(statusCode.SERVER_ERROR, e.message || constants.unknownErrorMessage, e.displayMessage || constants.unknownErrorMessage)
    }
  }
}