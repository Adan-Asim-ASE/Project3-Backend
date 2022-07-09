const { password } = require("pg/lib/defaults");
const db = require("../models");
const jwt = require("jsonwebtoken");
const users = db.users;

exports.createUser = (req, res) => {
  if ((!req.body)) {
    req.status(400).send({
      message: "User cannot be empty"
    });
    return;
  }
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }
  users.create(user)
    .then((user) => {
      const accessToken = jwt.sign({ user: user}, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });
      res.json({accessToken});
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred"
      });
    });
};

exports.findUser = (req, res) => {
  const email = req.params.email;
  const password = req.body.password;

  users.findOne({ where: { email: email, password: password } })
    .then((user) => {
      if (user != undefined) {
        const accessToken = jwt.sign({ user: user}, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });
        res.json({accessToken});
      }
      else {
        res.status(404).send({
          message: "Cannot find user with email=" + email + " and password=" + password
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with email=" + email + " and password=" + password
      });
    });
};

