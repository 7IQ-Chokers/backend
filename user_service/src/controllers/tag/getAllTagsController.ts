import { Response } from "express";
import ProtectedUserRequest from "../../types/types";
import Metadata from "../../models/Metadata";

const getAllTagsController = async (
  req: ProtectedUserRequest,
  res: Response
) => {
  const email = req.user?.email;

  if (!email) {
    res.status(403).send("Unauthorized");
    return;
  }

  // Get all tags
  const allTags = (await Metadata.findOne({ key: "tags" })) || { value: [] };

  res.json({
    messages: `Tags retrieved`,
    data: allTags.value,
  });
  return;
};

export default getAllTagsController;
