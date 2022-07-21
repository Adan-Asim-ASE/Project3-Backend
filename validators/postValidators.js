const { check, validationResult } = require('express-validator');

exports.validateCreatePost = [
  check('title')
    .not()
    .isEmpty()
    .withMessage('Post title can not be empty!')
    .bail()
    .isLength({ min: 1 })
    .withMessage('Minimum 1 character required!')
    .bail(),
  check('content')
    .not()
    .isEmpty()
    .withMessage('Post content can not be empty!')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Minimum 5 characters required!')
    .bail(),
  check('published')
    .not()
    .isEmpty()
    .withMessage('Post published status can not be empty!')
    .bail(),
  // eslint-disable-next-line consistent-return
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(422).json({ errors: errors.array() }); }
    next();
  },
];

exports.validateUpdatePost = [
  check('title')
    .not()
    .isEmpty()
    .withMessage('Post title can not be empty!')
    .bail()
    .isLength({ min: 1 })
    .withMessage('Minimum 1 character required!')
    .bail(),
  check('content')
    .not()
    .isEmpty()
    .withMessage('Post content can not be empty!')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Minimum 5 characters required!')
    .bail(),
  check('published')
    .not()
    .isEmpty()
    .withMessage('Post published status can not be empty!')
    .bail(),
  // eslint-disable-next-line consistent-return
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(422).json({ errors: errors.array() }); }
    next();
  },
];
