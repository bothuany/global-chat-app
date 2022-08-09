const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.route("/send").post(messageController.createMessage);
router.route("/").get(messageController.getMessages);
//router.route("/:id").get(messageController.getMessage);
//router.route("/:id").delete(messageController.deleteMessage);

module.exports = router;
