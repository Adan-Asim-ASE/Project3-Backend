const { password } = require("pg/lib/defaults");
const db = require("../models");
const { body, validationResult } = require('express-validator');
const { generateToken } = require('../utils/generateToken');


var argon2 = require('argon2');
const users = db.users;

exports.createUser = (req, res) => {

  users.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user != undefined) {
        res.status(400).json({
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

exports.userLogin = (req, res) => {
  const email = req.body.email;
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
            else {
              res.status(400).json({
                message: "Invalid email or password"
              });
            }
          }).catch((err) => {
            res.status(404).json({
              message: "Something went wrong " + err
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

