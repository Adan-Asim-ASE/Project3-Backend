const { check, validationResult } = require('express-validator');

exports.validateCreateUser = [
  check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .bail()
    .isLength({ min: 1 })
    .withMessage('Minimum 1 character required!')
    .bail(),
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .bail()
    .not()
    .isEmpty()
    .withMessage('Invalid email address!')
    .bail(),
  check('password')
    .not()
    .isEmpty()
    .withMessage('User password can not be empty!')
    .bail()
    .isLength({ min: 1 })
    .withMessage('Minimum 1 character required!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

exports.validateUserLogin = [
  check('password')
    .not()
    .isEmpty()
    .withMessage('User password can not be empty!')
    .bail()
    .isLength({ min: 1 })
    .withMessage('Minimum 1 characters required!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];