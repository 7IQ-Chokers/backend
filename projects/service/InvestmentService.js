const getInvestmentById = async (id) => {
    const investment = await Investment.findById(id);
    return investment;
}

const getAllInvestmentsForAPerson = async(personId) => {
    let investments = await Investment.findAll({investorId: personId});
    return investments;
}

const getAllInvestmentsForAProject = async(projectId) => {
    let investments = await Investment.findAll({projectId: projectId});
    return investments;
}


const addInvestment = async(investment) => {
    if(investment && investment.investor_id && investment.project_id) {
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