const { password } = require("pg/lib/defaults");
const db = require("../models");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');
var argon2 = require('argon2');
const users = db.users;

generateToken = (user) => {
  const accessToken = jwt.sign({ user: user }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });
  return accessToken;
}


exports.createUser = (req, res) => {

  users.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user != undefined) {
        res.status(404).json({
          message: "Email already exists"
        });
      }
      else {
        argon2.hash(req.body.password)
          .then(hash => {
            const user = {
              name: req.body.name,
              email: req.body.email,
              password: hash,
            }
            users.create(user)
              .then((user) => {
                const accessToken = generateToken(user);
                res.status(200).json({ accessToken });
              })
              .catch((err) => {
                res.status(500).json({
                  message: err.message || "Something went wrong"
                });
              });
          });
      }
    })
}

exports.checkUser = (req, res) => {
  const email = req.params.email;
  const password = req.body.password;

  users.findOne({ where: { email: email } })
    .then((user) => {
      if (user != undefined) {
        argon2.verify(user.password, password)
          .then(match => {
            if (match == true) {
              const accessToken = generateToken(user);
              res.status(200).json({ accessToken });
            }
            else{
              res.status(404).json({
                message: "Invalid email or password"
              });
            }
          }).catch(() => {
            res.status(404).json({
              message: "Invalid email or password"
            });
          });
      }
      else {
        res.status(404).json({
          message: "Invalid email or password"
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong"
      });
    });
};

