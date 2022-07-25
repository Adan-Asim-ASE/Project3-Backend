const argon2 = require('argon2');
const db = require('../models');
const { generateToken } = require('../utils/generateToken');

const { users } = db;

exports.createUser = (req, res) => {
  users.findOne({ where: { email: req.body.email } })
    .then((user) => {
      // eslint-disable-next-line eqeqeq
      if (user != undefined) {
        res.status(400).json({
          message: 'Email already exists',
        });
      } else {
        argon2.hash(req.body.password)
          .then((hash) => {
            // eslint-disable-next-line no-shadow
            const user = {
              name: req.body.name,
              email: req.body.email,
              password: hash,
            };
            users.create(user)
              // eslint-disable-next-line no-shadow
              .then((user) => {
                const accessToken = generateToken(user);
                res.status(200).json({ accessToken });
              })
              .catch((err) => {
                res.status(500).json({
                  message: err.message || 'Something went wrong',
                });
              });
          });
      }
    });
};

exports.userLogin = (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  users.findOne({ where: { email } })
    .then((user) => {
      // eslint-disable-next-line eqeqeq
      if (user != undefined) {
        argon2.verify(user.password, password)
          .then((match) => {
            // eslint-disable-next-line eqeqeq
            if (match == true) {
              const accessToken = generateToken(user);
              res.status(200).json({ accessToken });
            } else {
              res.status(400).json({
                message: 'Invalid email or password',
              });
            }
          }).catch((err) => {
            res.status(404).json({
              // eslint-disable-next-line prefer-template
              message: 'Something went wrong' + err,
            });
          });
      } else {
        res.status(404).json({
          message: 'Invalid email or password',
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'Something went wrong',
      });
    });
};
