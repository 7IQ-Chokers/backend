require('dotenv').config({
    path: 'config/.env',
});
const OpenAI = require("openai");
const openai = new OpenAI();
const { v4: uuidv4 } = require('uuid');

const getProposalById = async (id) => {
    const proposal = await Proposal.findById(id).populate('problem').exec();
    return proposal;
}

const getAllProposalsByTags = async(tags) => {
    let filter = { tags: tags };
    filter.tags = { $in: filter.tags.map(t => new RegExp(t)) };
    let problems = await Proposal.find(filter);
    return problems;
}

const getAllProposalsForAPerson = async(personId) => {
    let proposals = await Proposal.find({createdBy: personId}).populate('problem').exec();
    return proposals;
}

const getAllProposalsForAProblem = async(problemId) => {
    let proposals = await Proposal.find({problem: problemId}).populate('problem').exec();
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

const addComment = async (userId, text, proposalId) => {
    let proposal = await Proposal.findById(proposalId);
    if(!proposal.comments) {
        proposal.comments = [];
    }
    let newComment = {
        "id": uuidv4(),
        "user": userId,
        "text": text
    };
    let comments = [...proposal.comments, newComment];
    await updateProposalById(proposalId, {comments: comments});
    return newComment;
}

const editComment = async(commentId, proposalId, text) => {
    let proposal = await Proposal.findById(proposalId);
    if(!proposal.comments) {
        proposal.comments = [];
    }
    let comments = [...proposal.comments];
    let newComment = null;
    comments.forEach(comment=> {
        if(comment.id == commentId) {
            comment.text = text;
            newComment = comment;
        }
    });
    await updateProposalById(proposalId, {comments: comments});
    return newComment;
}

const deleteComment = async (commentId, proposalId) => {
    let proposal = await Proposal.findById(proposalId);
    if(!proposal.comments) {
        proposal.comments = [];
    }
    let comments = [...proposal.comments];
    comments = comments.filter(comment => comment.id != commentId);
    await updateProposalById(proposalId, {comments: comments});
    return true;
}

const validateProposalObject = (proposal) => {
    return proposal && proposal.title;
}

const formatProposalObject = (proposal) => {
    if(!proposal.description) {
        proposal.description = "";
    }
    if(!proposal.media) {
        proposal.media = [];
    }
    if(!proposal.tags) {
        proposal.tags = [];
    }
    return proposal;
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
    generateProposalForAProject,
    addComment,
    editComment,
    deleteComment
};