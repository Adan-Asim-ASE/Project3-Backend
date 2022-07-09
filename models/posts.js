'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {

    static associate(models) {
      this.belongsTo(models.users, {
        foreignKey: "userId",
        as: "user",
      })
    }
  }

  posts.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.BOOLEAN
  }, 
  {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};