const investmentService = require("../service/InvestmentService");

module.exports = {
    findAllInvestmentsForAPerson: async(req, res, next) => {
        let personId = req.body.id;
        let investments = await investmentService.getAllInvestmentsForAPerson(personId);
        res.json({status: 'success', data: {investments: investments}});
    },

    findAllInvestmentsForAProject: async (req, res, next) => {
        let projectId = req.body.projectId;
        let investments = await investmentService.getAllInvestmentsForAProject(projectId);
        res.json({status: 'success', data: {investments: investments}});
    },

    createInvestment: async (req, res, next) => {
        let investment = req.body.investment;
        investment = await investmentService.addInvestment(investment);
        if(project) {
            res.json({status: 'success', data: {investment: investment}});
        } else {
            res.json({status: 'failure', data: null});
        }
    },

    updateInvestment: async (req, res, next) => {
        let investmentId = req.body.investmentId;
        let data = req.body.editData;
        let status = await investmentService.updateInvestmentById(investmentId, data);
        if(status) {
            res.json({status: 'success'});
        } else {
            res.json({status: 'failure'});
        }
    }
}