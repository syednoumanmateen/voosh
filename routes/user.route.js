const userController = require("../controllers/user.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const userValidtor = require("../middlewares/validators/user.validator")

module.exports = function (router) {
  router.get("/user/fetchAll", [authMiddleware.validateToken], userController.fetchAllUser)
  router.get("/user/fetch", [authMiddleware.validateToken], userController.fetchUser)
  router.post("/user/signUp", [userValidtor.signUp,], userController.signUp)
  router.post("/user/signIn", [userValidtor.signIn,], userController.signIn)
  router.post("/user/forgotPassword", [userValidtor.forgotPassword,], userController.forgotPassword)
  router.post("/user/resetPassword", [userValidtor.resetPassword,], userController.resetPassword)
  router.post("/user/reload", [userValidtor.reload], userController.reload)
  router.post("/user/signOut", [], userController.signOut)
  router.put("/user/update", [userValidtor.update, authMiddleware.validateToken], userController.updateUser)
  router.delete("/user/delete", [authMiddleware.validateToken], userController.deleteUser)
}