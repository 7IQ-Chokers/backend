import { Response } from "express";
import ProtectedUserRequest from "../../types/types";
import Metadata from "../../models/Metadata";

const addNewTagController = async (
  req: ProtectedUserRequest,
  res: Response
) => {
  const email = req.user?.email;

  const { tag } = req.body;

  if (!email) {
    res.status(403).send("Unauthorized");
    return;
  }

  if (!tag) {
    res.status(400).send("'tag' is required in body");
    return;
  }

  await Metadata.findOneAndUpdate(
    { key: "tags" },
    { $push: { value: tag.toLowerCase() } }
  );

  res.send(`Tag created`);
  return;
};

export default addNewTagController;
