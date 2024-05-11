const problemService = require("../service/ProblemService");

module.exports = {
    findProblemsByLocation: async (req, res, next) => {
        let location = req.body.location;
        let maxDistanceInMetres = req.body.maxDistanceInMetres;
        let problems = await problemService.getAllProblemsNearALocation(location, maxDistanceInMetres);
        res.json({status: 'success', data: {problems: problems}});
    },

    findProblemsByTags: async (req, res, next) => {
        let tags = req.body.tags;
        let problems = await problemService.getAllProblemsByTags(tags);
        res.json({status: 'success', data: {problems: problems}});
    },

    findSimilarProblemsToAProblem: async (req, res, next) => {
        let problemId = req.body.problemId;
        let problem = await problemService.getProblemById(problemId);
        let tags = problem.tags;
        let problems = await problemService.getAllProblemsByTags(tags);
        problems = problems.filter(problem => problem._id != problemId);
        res.json({status: 'success', data: {problems: problems}});
    },

    createProblem: async (req, res, next) => {
        let problem = req.body.problem;
        problem = await problemService.addProblem(problem);
        if(problem) {
            res.json({status: 'success', data: {problem: problem}});
        } else {
            res.json({status: 'failure', data: null});
        }
    },

    updateProblem: async (req, res, next) => {
        let problemId = req.body.problemId;
        let data = req.body.editData;
        let status = await problemService.updateProblemById(problemId, data);
        if(status) {
            res.json({status: 'success'});
        } else {
            res.json({status: 'failure'});
        }
    },

    suggestTags: async (req, res, next) => {
        let description = req.body.description;
        let tags = await problemService.suggestTagsForProblem(description);
        res.json({status: 'success', data: {tags: tags}});
    }
}