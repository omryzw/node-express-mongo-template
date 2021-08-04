const router = require("express").Router();
const tlController = require('../controllers/tlpost');

router.post("/", tlController.addNewPost);

router.get("/", tlController.getAllPosts);

module.exports = router;
