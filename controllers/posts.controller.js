const db = require('../models');

const { posts } = db;

exports.createPost = (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const userName = user.name;

  const post = {
    title: req.body.title,
    content: req.body.content,
    published: req.body.published,
    userId: id,
    userName,
  };

  posts.create(post)
    // eslint-disable-next-line no-shadow
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred',
      });
    });
};

exports.findPostsByUserId = (req, res) => {
  const { user } = req.user;
  const { id } = user;

  posts.findAll({ where: { userId: id } })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(500).json({
        message: 'Error retrieving posts',
      });
    });
};

exports.findPublishedPostsByUserId = (req, res) => {
  const { user } = req.user;
  const { id } = user;

  posts.findAll({ where: { userId: id, published: true } })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(500).json({
        message: 'Error retrieving posts',
      });
    });
};

exports.findAllPublishedPosts = (req, res) => {
  posts.findAll({ where: { published: true } })
    // eslint-disable-next-line no-shadow
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({
        message: 'Error retrieving posts',
      });
    });
};

exports.findDraftedPostsByUserId = (req, res) => {
  const { user } = req.user;
  const { id } = user;

  posts.findAll({ where: { userId: id, published: false } })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(500).json({
        message: 'Error retrieving posts',
      });
    });
};

exports.deletePost = (req, res) => {
  const pid = req.params.postId;

  posts.destroy({ where: { id: pid } })
    .then((post) => {
      // eslint-disable-next-line eqeqeq
      if (post == 1) {
        res.status(200).json('Post deleted successfully');
      } else {
        res.status(404).json({
          message: 'Cannot find post specified to delete',
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'Some error occurred in deleting post',
      });
    });
};

exports.updatePost = (req, res) => {
  const pid = req.params.postId;

  posts.update(req.body, { where: { id: pid } })
    .then((num) => {
      // eslint-disable-next-line eqeqeq
      if (num == 1) {
        res.status(200).json({ message: 'Post updated Successfully' });
      } else {
        res.status(404).json({ message: 'Cannot update specified post' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Some error occurred in updating post' });
    });
};
