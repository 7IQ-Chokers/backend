const projectService = require("../service/ProjectService");
const proposalService = require("../service/ProposalService");

module.exports = {
    findAllProjectsForAProposal: async(req, res, next) => {
        let proposalId = req.body.proposalId;
        let projects = await projectService.getAllProjectsForAProposal(proposalId);
        res.json({status: 'success', data: {projects: projects}});
    },

    findProjectsByTags: async (req, res, next) => {
        let tags = req.body.tags;
        let projects = await projectService.getAllProjectsByTags(tags);
        res.json({status: 'success', data: {projects: projects}});
    },

    findProjectsForInvestor: async (req, res, next) => {
        let investorId = req.body.investorId;
        let investor = await User.findById(investorId);
        let tags = investor.interests;
        let projects = await projectService.getAllProjectsByTags(tags);
        res.json({status: 'success', data: {projects: projects}});
    },

    upvoteProject: async (req, res, next) => {
        let userId = req.body.id;
        let projectId = req.body.projectId;
        let status = await projectService.upvoteProject(userId, projectId);
        if(status) {
            res.json({status: 'success'});
        } else {
            res.json({status: 'failure'});
        }
    },

    downvoteProject: async (req, res, next) => {
        let userId = req.body.id;
        let projectId = req.body.projectId;
        let status = await projectService.downvoteProject(userId, projectId);
        if(status) {
            res.json({status: 'success'});
        } else {
            res.json({status: 'failure'});
        }
    },

    createProject: async (req, res, next) => {
        let project = req.body.project;
        if(!project.proposal) {
            let description = await proposalService.generateProposalForAProject(project.title, project.description);
            let proposal = await proposalService.addProposal({
                title: `Proposal for ${project.title}`,
                description: description,
                media: [],
                problem: problemId,
                createdBy: userId,
                tags: project.tags
            });
            project.proposal = proposal._id;
        }
        
        project = await projectService.addProject(project);
        if(project) {
            res.json({status: 'success', data: {project: project}});
        } else {
            res.json({status: 'failure', data: null});
        }
    },

    updateProject: async (req, res, next) => {
        let projectId = req.body.projectId;
        let data = req.body.editData;
        let status = await projectService.updateProjectById(projectId, data);
        if(status) {
            res.json({status: 'success'});
        } else {
            res.json({status: 'failure'});
        }
    }
}