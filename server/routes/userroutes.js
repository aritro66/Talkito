const express = require("express");
const router = express.Router();
const { getAllUsers, createUser } = require("../controllers/usercontroller");

router.get("/", getAllUsers);
router.post("/create", createUser);

module.exports = router;
