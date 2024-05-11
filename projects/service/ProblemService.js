require('dotenv').config({
    path: 'config/.env',
  });
const axios = require("axios");

const LLAMA_URI = process.env.LLAMA_URI || "";

const processLocation = async (problem) => {
    let location = problem["location"];
    let response = await axios.post(`https://geocode.maps.co/reverse?lat=${location["coordinates"]["latitude"]}&lon=${location["coordinates"]["longitude"]}&api_key=663fb43306219517704421locfce31f`);
    if(response.status == 200 && response.data) {
        let address = response.data;
        problem.locationDisplayName = address["display_name"];
        problem.location.coordinates = [location["coordinates"]["longitude"], location["coordinates"]["latitude"]];
    }
    return problem;
}

const getProblemById = async (id) => {
    const problem = await Problem.findById(id);
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
    if(!problem.description) {
        problem.description = "";
    }
    if(!problem.media) {
        problem.media = [];
    }
    if(!problem.tags) {
        problem.tags = [];
    }
    return problem;
}

const addProblem = async(problem) => {
    if(validateProblemObject(problem)) {
        problem = formatProblemObject(problem);
        problem = await processLocation(problem);
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

const suggestTagsForProblem = async (description) => {
    let response = await axios.post(`${LLAMA_URI}/api/generate`, {
        "model": "llama3",
        "prompt": `You are an AI assistant. You specialise in suggesting tags for a problem statement. Given a description of a social impact problem: ${description}. Suggest 10 tags for the description. Just return a json with field 'tags' containing the tags. Do not return any supporting text without fail.`
    });
    let jsonResponse = JSON.parse(response.data["response"]);
    if(jsonResponse && jsonResponse["tags"]) {
        return jsonResponse["tags"];
    }
    return [];
}

module.exports = {
    getProblemById,
    getAllProblemsByTags,
    getAllProblemsNearALocation,
    addProblem,
    updateProblemById,
    deleteProblemById,
    suggestTagsForProblem
}