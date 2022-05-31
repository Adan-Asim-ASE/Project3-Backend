const { password } = require("pg/lib/defaults");
const db = require("../models");
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
      res.send(user);
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

  console.log(req.body.password);
  users.findOne({ where: { email: email, password: password } })
    .then((user) => {
      console.log(user);
      if (user!= undefined) {
        res.send(user);
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
