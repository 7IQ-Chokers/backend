import { Response } from "express";
import ProtectedUserRequest from "../../types/types";
import Organization from "../../models/Organization";

const addNewOrganizationController = async (
  req: ProtectedUserRequest,
  res: Response
) => {
  const email = req.user?.email;

  const { name } = req.body;

  if (!email) {
    res.status(403).send("Unauthorized");
    return;
  }

  if (!name) {
    res.status(400).send("'name' is required in body");
    return;
  }

  const newOrg = new Organization({
    name: name.toLowerCase(),
  });

  await newOrg.save();

  res.send(`Organization created`);
  return;
};

export default addNewOrganizationController;
