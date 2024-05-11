'use strict';
const express = require('express');
const router = express.Router();
const proposalController = require('../api/ProposalController');

router.post('/forProblem', proposalController.findAllProposalsForAProblem);
router.post('/tags', proposalController.findProposalsByTags);
router.post('/add', proposalController.createProposal);
router.post('/update', proposalController.updateProposal);
router.post('/similarProblem', proposalController.findProposalsForAProblem);

module.exports = router;