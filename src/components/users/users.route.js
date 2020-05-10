const router = require("express").Router();

const userController = require("./users.controller");

router
    .route("/")
    .get(userController.fetch)
    .post(userController.create)

router
    .route("/:id")
    .get(userController.fetchById)
    .put(userController.update)
    .delete(userController.remove)

module.exports = router;
