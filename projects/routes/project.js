'use strict';
const express = require('express');
const router = express.Router();
const projectController = require('../api/ProjectController');

router.post('/forProposal', projectController.findAllProjectsForAProposal);
router.post('/tags', projectController.findProjectsByTags);
router.post('/add', projectController.createProject);
router.post('/update', projectController.updateProject);

module.exports = router;