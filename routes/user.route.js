const userController = require("../controllers/user.controller")
const authMiddleware = require("../middlewares/auth.middleware")

module.exports = function (router) {
  router.get("/user/fetchAll", [authMiddleware.validateToken], userController.fetchAllUser)
  router.get("/user/fetch", [authMiddleware.validateToken], userController.fetchUser)
  router.post("/user/signUp", [], userController.signUp)
  router.post("/user/signIn", [], userController.signIn)
  router.post("/user/forgotPassword", [], userController.forgotPassword)
  router.post("/user/resetPassword", [], userController.resetPassword)
  router.post("/user/reload", [], userController.reload)
  router.post("/user/signOut", [], userController.signOut)
  router.put("/user/update", [authMiddleware.validateToken], userController.updateUser)
  router.delete("/user/delete", [authMiddleware.validateToken], userController.deleteUser)
}