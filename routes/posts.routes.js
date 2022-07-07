const express = require('express');
const router = express.Router();
const controller = require("../controllers/posts.controller.js");

router.post("/", controller.createPost);
router.get("/me", controller.findAllPostsByUserId);
router.get("/me/published", controller.findPublishedPostsByUserId);
router.get("/me/drafted", controller.findDraftedPostsByUserId);
router.delete("/", controller.DeletePost);
router.post("/edit", controller.UpdatePost);

module.exports = router
