const express = require('express');
const router = express.Router();
const controller = require("../controllers/posts.controller.js");
const auth = require("../middlewares/auth");

router.post("/", auth, controller.createPost);
router.get("/", controller.findAllPublishedPosts);
router.get("/me", auth, controller.findPostsByUserId);
router.get("/me/published", auth, controller.findPublishedPostsByUserId);
router.get("/me/drafted", auth, controller.findDraftedPostsByUserId);
router.delete("/", auth, controller.DeletePost);
router.post("/edit", auth, controller.UpdatePost);

module.exports = router
