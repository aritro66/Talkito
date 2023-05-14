const express = require("express");
const router = express.Router();
const {
  getAllMessages,
  createMessage,
} = require("../controllers/messagecontroller");

router.get("/", getAllMessages);
router.post("/create", createMessage);

module.exports = router;
