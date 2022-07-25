const express = require('express');

const router = express.Router();
const controller = require('../controllers/users.controller');
const userValidators = require('../validators/userValidators');

router.post('/', userValidators.validateCreateUser, controller.createUser);
router.post('/login', userValidators.validateUserLogin, controller.userLogin);

module.exports = router;
