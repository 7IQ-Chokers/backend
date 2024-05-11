require('dotenv').config({
    path: 'config/.env',
});
const OpenAI = require("openai");
const openai = new OpenAI();


const getProposalById = async (id) => {
    const proposal = await Proposal.findById(id).populate('problem').exec();
    return proposal;
}

const getAllProposalsByTags = async(tags) => {
    let filter = { tags: tags };
    filter.tags = { $in: filter.tags.map(t => new RegExp(t)) };
    let proposals = await Proposal.find(filter).populate('problem').exec();
    return proposals;
}

const getAllProposalsForAPerson = async(personId) => {
    let proposals = await Proposal.findAll({createdBy: personId}).populate('problem').exec();
    return proposals;
}

const getAllProposalsForAProblem = async(problemId) => {
    let proposals = await Proposal.findAll({problemId: problemId}).populate('problem').exec();
    return proposals;
}

const generateProposalForAProject = async(title, description) => {
    let prompt = `
     You are an AI assistant that specialises in writing proposals for projects.
     Consider a social impact project with title: ${title} and description: ${description}.
     Write a concise proposal for the project in about 100 words.
    `;
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
    });
    
    return completion.choices[0];
    
}

const validateProposalObject = (proposal) => {
    return proposal && proposal.title;
}

const formatProposalObject = (proposal) => {
    if(proposal.description) {
        proposal.description = "";
    }
    if(proposal.media) {
        proposal.media = [];
    }
    if(proposal.tags) {
        proposal.tags = [];
    }
}

const addProposal = async(proposal) => {
    if(validateProposalObject(proposal)) {
        proposal = formatProposalObject(proposal);
        proposal = await Proposal.create(proposal);
        return proposal;
    }
    return null;
}

const updateProposalById = async(proposal_id, data) => {
    if(proposal_id) {
        await Proposal.findByIdAndUpdate(proposal_id, data);
        return true;
    }
    return false;
}

const deleteProposalById = async(proposal_id) => {
    if(proposal_id) {
        await Proposal.findOneAndDelete(proposal_id);
        return true;
    }
    return false;
}

module.exports = {
    getProposalById,
    getAllProposalsByTags,
    getAllProposalsForAPerson,
    getAllProposalsForAProblem,
    addProposal,
    updateProposalById,
    deleteProposalById,
    generateProposalForAProject
};