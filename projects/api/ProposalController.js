const proposalService = require("../service/ProposalService");
const problemService = require("../service/ProblemService");

module.exports = {
    findAllProposalsForAProblem: async(req, res, next) => {
        let problemId = req.body.problemId;
        let proposals = await proposalService.getAllProposalsForAProblem(problemId);
        res.json({status: 'success', data: {proposals: proposals}});
    },

    findProposalsByTags: async (req, res, next) => {
        let tags = req.body.tags;
        let proposals = await proposalService.getAllProposalsByTags(tags);
        res.json({status: 'success', data: {proposals: proposals}});
    },
    
    findProposalsForAProblem: async (req, res, next) => {
        let problemId = req.body.problemId;
        let problem = await problemService.getProblemById(problemId);
        let tags = problem.tags;
        let proposals = await proposalService.getAllProposalsByTags(tags);
        res.json({status: 'success', data: {proposals: proposals}});
    },

    createProposal: async (req, res, next) => {
        let proposal = req.body.proposal;
        proposal = await proposalService.addProposal(proposal);
        if(proposal) {
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
    },

    addComment: async (req, res, next) => {
        let proposalId = req.body.proposalId;
        let userId = req.body.id;
        let text = req.body.text;
        let comment = await proposalService.addComment(userId, text, proposalId);
        res.json({status: 'success', data: {comment: comment}});
    },

    editComment: async(req, res, next) => {
        let proposalId = req.body.proposalId;
        let commentId = req.body.commentId;
        let text = req.body.text;
        let newComment = await proposalService.editComment(commentId, proposalId, text);
        res.json({status: 'success', data: {comment: newComment}});
    },

    deleteComment: async(req, res, next) => {
        let proposalId = req.body.proposalId;
        let commentId = req.body.commentId;
        let status = await proposalService.deleteComment(commentId, proposalId);
        if(status) {
            res.json({status: 'success'});
        } else {
            res.json({status: 'failure'});
        }
    }
}