const router = require("express").Router();

const questController = require("./que.controller");

router.route("/").get(questController.fetchAll).post(questController.insert);

router.route("/:category").get(questController.fetchByCategory);

router.route("/:id").put(questController.update).delete(questController.delete);

module.exports = router;
