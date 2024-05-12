"use strict";
const express = require("express");
const router = express.Router();
const projectController = require("../api/ProjectController");

router.post("/forProposal", projectController.findAllProjectsForAProposal);
router.post("/tags", projectController.findProjectsByTags);
router.post("/add", projectController.createProject);
router.post("/update", projectController.updateProject);
router.post("/upvote", projectController.upvoteProject);
router.post("/downvote", projectController.downvoteProject);
router.post("/investor", projectController.findProjectsForInvestor);
router.get("/:id", projectController.findProjectById);

module.exports = router;
