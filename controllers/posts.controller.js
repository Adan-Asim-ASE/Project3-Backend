const { password } = require("pg/lib/defaults");
const db = require("../models");
const { body, validationResult } = require('express-validator');
const posts = db.posts;

exports.createPost = (req, res) => {
  const {user} = req.user;
  id = user.id;
  userName = user.name;

  const post = {
    title: req.body.title,
    content: req.body.content,
    published: req.body.published,
    userId: id,
    userName: userName,
  }

  posts.create(post)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({
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
        res.status(200).json(post);
      }
      else {
        res.status(200).json({
          message: 'Cannot find any post'
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving posts"
      });
    });
};

exports.findPublishedPostsByUserId = (req, res) => {

  const {user} = req.user;
  id = user.id;

  posts.findAll({ where: { userId: id, published: true } })
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      }
      else {
        res.status(200).json({
          message: 'Cannot find any published post'
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving posts"
      });
    });
};

exports.findAllPublishedPosts = (req, res) => {

  posts.findAll({ where: { published: true } })
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      }
      else {
        res.status(200).json({
          message: 'Cannot find any published post'
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
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
        res.status(200).json(post);
      }
      else {
        res.status(200).json({
          message: 'Cannot find any drafted post'
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving posts"
      });
    });
};


exports.deletePost = (req, res) => {
  const pid = req.params.postId;
  
  posts.destroy({ where: { id: pid } })
    .then((post) => {
      if (post == 1) {
        res.status(200).json("Post deleted successfully");
      }
      else {
        res.status(404).json({
          message: 'Cannot find post specified to delete'
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Some error occurred in deleting post"
      });
    });
};

exports.updatePost = (req, res) => {
  const pid = req.params.postId;
  console.log(req.body);

  posts.update(req.body, { where: { id: pid } })
    .then(num => {
      if (num == 1) {
        res.status(200).json({ message: "Post updated Successfully" });
      }
      else {
        res.status(404).json({ message: "Cannot update specified post" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Some error occurred in updating post" });
    });
}

