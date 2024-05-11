'use strict';
const express = require('express');
const router = express.Router();
const proposalController = require('../api/ProposalController');

router.post('/forProblem', proposalController.findAllProposalsForAProblem);
router.post('/tags', proposalController.findProposalsByTags);
router.post('/add', proposalController.createProposal);
router.post('/update', proposalController.updateProposal);
router.post('/similarProblem', proposalController.findProposalsForAProblem);
router.post('/comments/add', proposalController.addComment);
router.post('/comments/edit', proposalController.editComment);
router.post('/comments/delete', proposalController.deleteComment);


module.exports = router;