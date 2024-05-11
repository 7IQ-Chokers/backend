import { Response } from "express";
import ProtectedUserRequest from "../../types/types";
import Organization from "../../models/Organization";
import Fuse from "fuse.js";

const getOrganizationByNameController = async (
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

  // Get all organizations
  const allOrgs = await Organization.find();

  const orgSearchFuse = new Fuse(allOrgs, {
    keys: ["name"],
  });

  const orgSearchResult = orgSearchFuse.search(search.toString());

  res.json({
    messages: `Organizations retrieved for search query '${search}'`,
    data: orgSearchResult,
  });
  return;
};

export default getOrganizationByNameController;
