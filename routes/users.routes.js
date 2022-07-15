const express = require('express');
const router = express.Router();
const controller = require("../controllers/users.controller.js");
const userValidators = require("../validators/userValidators")


router.post("/", userValidators.validateCreateUser,controller.createUser);
router.post("/:email", userValidators.validateCheckUser,controller.checkUser);

module.exports = router
