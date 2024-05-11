const getProjectById = async (id) => {
    const project = await Project.findById(id);
    return project;
}

const getAllProjectsByTags = async(tags) => {
    let filter = { tags: tags };
    filter.tags = { $in: filter.tags.map(t => new RegExp(t)) };
    let projects = await Project.find(filter);
    return projects;
}

const getAllProjectsForAPerson = async(personId) => {
    let projects = await Project.findAll({createdBy: personId});
    return projects;
}

const getAllProjectsForAProposal = async(proposalId) => {
    let projects = await Project.findAll({proposalId: proposalId});
    return projects;
}

const validateProjectObject = (project) => {
    return project && project.title;
}

const formatProjectObject = (project) => {
    if(project.description) {
        project.description = "";
    }
    if(project.media) {
        project.media = [];
    }
    if(project.tags) {
        project.tags = [];
    }
}

const addProject = async(project) => {
    if(validateProjectObject(project)) {
        project = formatProjectObject(project);
        project = await Project.create(project);
        return project;
    }
    return null;
}

const updateProjectById = async(project_id, data) => {
    if(project_id) {
        await Project.findByIdAndUpdate(project_id, data);
        return true;
    }
    return false;
}

const deleteProjectById = async(project_id) => {
    if(project_id) {
        await Project.findOneAndDelete(project_id);
        return true;
    }
    return false;
}