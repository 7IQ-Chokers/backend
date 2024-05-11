const getProposalById = async (id) => {
    const proposal = await Proposal.findById(id);
    return proposal;
}

const getAllProposalsByTags = async(tags) => {
    let filter = { tags: tags };
    filter.tags = { $in: filter.tags.map(t => new RegExp(t)) };
    let proposals = await Proposal.find(filter);
    return proposals;
}

const getAllProposalsForAPerson = async(personId) => {
    let proposals = await Proposal.findAll({createdBy: personId});
    return proposals;
}

const getAllProposalsForAProblem = async(problemId) => {
    let proposals = await Proposal.findAll({problemId: problemId});
    return proposals;
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