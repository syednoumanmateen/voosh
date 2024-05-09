const uploadController = require("../controllers/upload.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")

module.exports = function (router) {
  router.get("/upload/fetchAll", [authMiddleware.validateToken], uploadController.fetchAllImage)
  router.get("/upload/fetch/:id", [authMiddleware.validateToken], uploadController.fetchImage)
  router.post("/upload/create", [authMiddleware.validateToken, authMiddleware.validateToken, uploadMiddleware.upload.single("upload")], uploadController.createImage)
  router.post("/upload/createMulti", [uploadMiddleware.upload.array("upload")], uploadController.createMultiImage)
  router.delete("/upload/delete/:id", [authMiddleware.validateToken], uploadController.deleteImage)
}