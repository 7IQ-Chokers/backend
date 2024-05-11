'use strict';
const express = require('express');
const router = express.Router();
const investmentController = require('../api/InvestmentController');

router.post('/forPerson', investmentController.findAllInvestmentsForAPerson);
router.post('/forProject', investmentController.findAllInvestmentsForAProject);
router.post('/add', investmentController.createInvestment);
router.post('/update', investmentController.updateInvestment);

module.exports = router;