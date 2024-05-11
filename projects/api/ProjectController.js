const projectService = require("../service/ProjectService");

module.exports = {
    findAllProjectsForAProposal: async(req, res, next) => {
        let proposalId = req.body.proposalId;
        let projects = await projectService.getAllProjectsForAProposal(proposalId);
        res.json({status: 'success', data: {projects: projects}});
    },

    findProjectsByTags: async (req, res, next) => {
        let tags = req.body.tags;
        let projects = await projectService.getAllProjectsByTags(tags);
        res.json({status: 'success', data: {proposals: proposals}});
    },

    createProject: async (req, res, next) => {
        let project = req.body.project;
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