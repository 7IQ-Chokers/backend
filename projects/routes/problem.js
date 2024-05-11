'use strict';
const express = require('express');
const router = express.Router();
const problemController = require('../api/ProblemController');

router.post('/', problemController.findProblemsByLocation);
router.post('/tags', problemController.findProblemsByTags);
router.post('/add', problemController.createProblem);
router.post('/update', problemController.updateProblem);

module.exports = router;