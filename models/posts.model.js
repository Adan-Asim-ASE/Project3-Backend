module.exports = (sequelize, Sequelize) => {
  const posts = sequelize.define("posts", {
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });
  return posts;
};