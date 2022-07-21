const express = require('express');

const router = express.Router();
const controller = require('../controllers/posts.controller');
const auth = require('../middlewares/auth');
const postValidators = require('../validators/postValidators');

router.post('/', auth, postValidators.validateCreatePost, controller.createPost);
router.get('/', controller.findAllPublishedPosts);
router.get('/me', auth, controller.findPostsByUserId);
router.get('/me/published', auth, controller.findPublishedPostsByUserId);
router.get('/me/drafted', auth, controller.findDraftedPostsByUserId);
router.delete('/:postId', auth, controller.deletePost);
router.post('/edit/:postId', auth, postValidators.validateCreatePost, controller.updatePost);

module.exports = router;
