module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define("users", {
    name: {
      type: Sequelize.STRING,
      validate:{
        notNull: false,
      }
    },
    email: {
      type: Sequelize.STRING,
      validate:{
        notNull: false,
        isEmail: true,
      }
    },
    password: {
      type: Sequelize.STRING,
      validate:{
        notNull: false,
      }
    }
  });
  
  return users;
};