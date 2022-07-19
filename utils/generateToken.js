const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
    const accessToken = jwt.sign({ user: user }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });
    return accessToken;
  }