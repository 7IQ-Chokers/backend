const problemService = require("../service/ProblemService");
const proposalService = require("../service/ProposalService");


module.exports = {
    findAllProposalsForAProblem: async(req, res, next) => {
        let problemId = req.body.problemId;
        let proposals = await proposalService.getAllProposalsForAProblem(problemId);
        res.json({status: 'success', data: {proposals: proposals}});
    },

    findProposalsByTags: async (req, res, next) => {
        let tags = req.body.tags;
        let proposals = await proposalService.getAllProposalsForAPerson(tags);
        res.json({status: 'success', data: {proposals: proposals}});
    },

    createProposal: async (req, res, next) => {
        let proposal = req.body.proposal;
        proposal = await proposalService.addProposal(proposal);
        if(problem) {
            res.json({status: 'success', data: {proposal: proposal}});
        } else {
            res.json({status: 'failure', data: null});
        }
    },

    updateProposal: async (req, res, next) => {
        let proposalId = req.body.proposalId;
        let data = req.body.editData;
        let status = await proposalService.updateProposalById(proposalId, data);
        if(status) {
            res.json({status: 'success'});
        } else {
            res.json({status: 'failure'});
        }
    }
}