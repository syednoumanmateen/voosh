const uploadController = require("../controllers/upload.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")
const uploadValidator = require("../middlewares/validators/upload.validator")


module.exports = function (router) {
  router.get("/upload/fetch/:id", [uploadValidator.fetch, authMiddleware.validateToken], uploadController.fetchImage)
  router.post("/upload/create", [uploadValidator.createImage, authMiddleware.validateToken, uploadMiddleware.upload.single("upload")], uploadController.createImage)
  router.post("/upload/createMulti", [uploadValidator.createMultiImage, authMiddleware.validateToken, uploadMiddleware.upload.array("upload")], uploadController.createMultiImage)
  router.delete("/upload/delete/:id", [uploadValidator.delete, authMiddleware.validateToken], uploadController.deleteImage)
}