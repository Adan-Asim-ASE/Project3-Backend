'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {

    static associate(models) {
    }
  }

  users.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  },
    {
      sequelize,
      modelName: 'users',
    });
  return users;
};