const getAllTags = async () => {
  const allTags = (await Metadata.findOne({ key: "tags" })) || { value: [] };
  return allTags.value;
};

module.exports = {
  getAllTags,
};
