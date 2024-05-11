import { Response } from "express";
import User from "../../../models/User";
import ProtectedUserRequest from "../../../types/types";

const toggleIsInvestorController = async (
  req: ProtectedUserRequest,
  res: Response
) => {
  const email = req.user?.email;

  if (!email) {
    res.status(403).send("Unauthorized");
    return;
  }

  const userDoc = await User.findOne({
    email: email,
  });

  if (!userDoc) {
    res.status(400).send("User not found");
    return;
  }

  userDoc.isInvestor = !userDoc.isInvestor;
  await userDoc.save();

  res.send(`isInvestor - Set to '${userDoc.isInvestor}'`);
  return;
};

export default toggleIsInvestorController;
