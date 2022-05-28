module.exports = (sequelize, Sequelize) => {
  const posts = sequelize.define("posts", {
    title: {
      type: Sequelize.STRING,
      validate:{
        notNull: false,
      }
    },
    content: {
      type: Sequelize.STRING,
      validate:{
        notNull: false,
      }
    },
    published: {
      type: Sequelize.BOOLEAN,
      validate:{
        notNull: false,
      }
    }
  });
  return posts;
};