const { password } = require("pg/lib/defaults");
const db = require("../models");
const posts = db.posts;

exports.createPost = (req, res) => {
  if ((!req.body)) {
    req.status(400).send({
      message: "Post cannot be empty"
    });
    return;
  }
  if ((req.session==undefined || req.session.user==undefined)) {
    res.status(400).send({
      message: "Please login first!"
    });
    return;
  }
  const post = {
    title: req.body.title,
    content: req.body.content,
    published: req.body.published,
    userId: req.session.user.id,
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


exports.findAllPostsByUserId = (req, res) => {
  if ((req.session==undefined || req.session.user==undefined)) {
    res.status(400).send({
      message: "Please login first!"
    });
    return;
  }
  const id = req.session.user.id;
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
  if ((req.session==undefined || req.session.user==undefined)) {
    res.status(400).send({
      message: "Please login first"
    });
    return;
  }
  const id = req.session.user.id;
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

exports.findDraftedPostsByUserId = (req, res) => {
  if ((req.session==undefined || req.session.user==undefined)) {
    res.status(400).send({
      message: "Please login first"
    });
    return;
  }
  const id = req.session.user.id;
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
  if ((req.session==undefined || req.session.user==undefined)) {
    res.status(400).send({
      message: "Please login first"
    });
    return;
  }
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
  if ((req.session==undefined || req.session.user==undefined)) {
    res.status(400).send({
      message: "Please login first"
    });
    return;
  }
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
