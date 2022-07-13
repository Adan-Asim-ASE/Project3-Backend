const { password } = require("pg/lib/defaults");
const db = require("../models");
const posts = db.posts;

exports.createPost = (req, res) => {
  if ((!req.body || !req.body.title || !req.body.content )) {
    res.status(400).send({
      message: "Post cannot be empty"
    });
    return;
  }
  
  const {user} = req.user;
  id = user.id;

  const post = {
    title: req.body.title,
    content: req.body.content,
    published: req.body.published,
    userId: id,
  }

  posts.create(post)
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred"
      });
    });
};

exports.findPostsByUserId = (req, res) => {

  const {user} = req.user;
  id = user.id;

  posts.findAll({ where: { userId: id } })
    .then((post) => {
      if (post) {
        res.send(post);
      }
      else {
        res.status(404).send({
          message: 'Cannot find any post with UserId=' + id
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving posts with Userid=" + id
      });
    });
};

exports.findPublishedPostsByUserId = (req, res) => {

  const {user} = req.user;
  id = user.id;

  posts.findAll({ where: { userId: id, published: true } })
    .then((post) => {
      if (post) {
        res.send(post);
      }
      else {
        res.status(404).send({
          message: 'Cannot find any published post by User No: ' + id
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving posts with Userid=" + id
      });
    });
};

exports.findAllPublishedPosts = (req, res) => {

  posts.findAll({ where: { published: true } })
    .then((posts) => {
      if (posts) {
        res.send(posts);
      }
      else {
        res.status(404).send({
          message: 'Cannot find any published post'
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving posts"
      });
    });
};


exports.findDraftedPostsByUserId = (req, res) => {

  const {user} = req.user;
  id = user.id;

  posts.findAll({ where: { userId: id, published: false } })
    .then((post) => {
      if (post) {
        res.send(post);
      }
      else {
        res.status(404).send({
          message: 'Cannot find any drafted post with by User No: ' + id
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving posts with Userid=" + id
      });
    });
};


exports.DeletePost = (req, res) => {
  const pid = req.body.postId;
  
  posts.destroy({ where: { id: pid } })
    .then((post) => {
      if (post == 1) {
        res.send("Post deleted successfully");
      }
      else {
        res.status(404).send({
          message: 'Cannot find any post with id= ' + pid
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving posts with id= " + pid
      });
    });
};

exports.UpdatePost = (req, res) => {
  const pid = req.body.postId;
  
  posts.update(req.body, { where: { id: pid } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Post updated Successfully" });
      }
      else {
        res.send({ message: "Cannot update post with given id" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error in updating given post" });
    });
}

