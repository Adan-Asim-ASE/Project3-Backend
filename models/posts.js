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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
    {
      sequelize,
      modelName: 'posts',
    });
  return posts;
};