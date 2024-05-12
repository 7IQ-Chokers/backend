const { default: axios } = require("axios");
const { getAllProjectsByTags } = require("./ProjectService");
const { getAllTags } = require("./TagService");

const LLAMA_URI = process.env.LLAMA_URI || "";

const getInvestorInterestTags = async (personId) => {
  let tags = (await User.findOne({ _id: personId })).interests;
  return tags;
};

const suggestOtherTagsBasedOnInterestTags = async (interestTags, allTags) => {
  let response = await axios.post(`${LLAMA_URI}/api/generate`, {
    model: "llama3",
    prompt: `You are an AI assistant. Given some 'interestTags', you specialise in finding other relevant tags from a list referred to as 'allTags'. Given 'allTags': ${allTags}. Given 'interestTags': ${interestTags}. Find out other closely related tags between 'allTags' and 'interestTags' to a maximum of 7. Just return a json with field 'unionTags' containing the union of the identified relevant tags and the initial 'interestTags'. Do not return any supporting text without fail. Ensure all tags are in lowercase. Strictly, all entries in 'unionTags' must be part of 'allTags' and must be a combined list of the identified tags and initially given 'interestTags'`,
    stream: false,
  });
  let jsonResponse = JSON.parse(response.data["response"]);
  if (jsonResponse && jsonResponse["unionTags"]) {
    return jsonResponse["unionTags"];
  }
  return interestTags;
};

const getInvestorRecommendedProjects = async (personId) => {
  const interestTags = await getInvestorInterestTags(personId);
  const allTags = await getAllTags();
  const unionTags = await suggestOtherTagsBasedOnInterestTags(
    interestTags,
    allTags
  );

  const recommendedProjects = await getAllProjectsByTags([
    ...unionTags,
    ...interestTags,
  ]);

  return recommendedProjects;
};

module.exports = {
  getInvestorInterestTags,
  suggestOtherTagsBasedOnInterestTags,
  getInvestorInterestTags,
  getInvestorRecommendedProjects,
};
