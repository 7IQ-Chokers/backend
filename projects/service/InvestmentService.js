const getInvestmentById = async (id) => {
    const investment = await Investment.findById(id).populate('investor').populate('project').exec();
    return investment;
}

const getAllInvestmentsForAPerson = async(personId) => {
    let investments = await Investment.find({investor: personId}).populate('investor').populate('project').exec();
    return investments;
}

const getAllInvestmentsForAProject = async(projectId) => {
    let investments = await Investment.find({project: projectId}).populate('investor').populate('project').exec();
    return investments;
}


const addInvestment = async(investment) => {
    if(investment && investment.investor && investment.project) {
        investment.status = "In Talks";
        investment = await Investment.create(investment);
        return investment;
    }
    return null;
}

const updateInvestmentById = async(investment_id, data) => {
    if(investment_id) {
        await Investment.findByIdAndUpdate(investment_id, data);
        return true;
    }
    return false;
}

const deleteInvestmentById = async(investment_id) => {
    if(investment_id) {
        await Investment.findOneAndDelete(investment_id);
        return true;
    }
    return false;
}

module.exports = {
    getAllInvestmentsForAPerson,
    getAllInvestmentsForAProject,
    addInvestment,
    updateInvestmentById,
    getInvestmentById
}