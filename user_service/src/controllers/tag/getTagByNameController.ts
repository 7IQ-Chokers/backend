import { Response } from "express";
import ProtectedUserRequest from "../../types/types";
import Organization from "../../models/Organization";
import Fuse from "fuse.js";
import Metadata from "../../models/Metadata";

const getTagByNameController = async (
  req: ProtectedUserRequest,
  res: Response
) => {
  const email = req.user?.email;

  const { search } = req.query;

  if (!email) {
    res.status(403).send("Unauthorized");
    return;
  }

  if (!search) {
    res.status(400).send("'search' is required in query parameter");
    return;
  }

  // Get all tags
  const allTags = (await Metadata.findOne({ key: "tags" })) || { value: [] };

  const tagSearchFuse = new Fuse(allTags.value);

  const tagSearchResult = tagSearchFuse.search(search.toString());

  res.json({
    messages: `Tags retrieved for search query '${search}'`,
    data: tagSearchResult,
  });
  return;
};

export default getTagByNameController;
