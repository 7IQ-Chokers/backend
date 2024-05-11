const getProblemById = async (id) => {
    const problem = await problem.findById(id);
    return problem;
}

const getAllProblemsByTags = async(tags) => {
    let filter = { tags: tags };
    filter.tags = { $in: filter.tags.map(t => new RegExp(t)) };
    let problems = await Problem.find(filter);
    return problems;
}

const getAllProblemsNearALocation = async(location, maxDistanceInMetres) => {
    const problems = await Problem.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [location.longitude, location.latitude],
          },
          $maxDistance: maxDistanceInMetres,
        },
      },
    })
    .sort("-score");
    return problems;
}

const validateProblemObject = (problem) => {
    return problem && problem.title && problem.location;
}

const formatProblemObject = (problem) => {
    if(problem.description) {
        problem.description = "";
    }
    if(problem.media) {
        problem.media = [];
    }
    if(problem.tags) {
        problem.tags = [];
    }
}

const addProblem = async(problem) => {
    if(validateProblemObject(problem)) {
        problem = formatProblemObject(problem);
        problem = await Problem.create(problem);
        return problem;
    }
    return null;
}

const updateProblemById = async(problem_id, data) => {
    if(problem_id) {
        await Problem.findByIdAndUpdate(problem_id, data);
        return true;
    }
    return false;
}

const deleteProblemById = async(problem_id) => {
    if(problem_id) {
        await Problem.findOneAndDelete(problem_id);
        return true;
    }
    return false;
}