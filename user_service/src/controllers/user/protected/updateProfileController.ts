import { Response } from "express";
import User from "../../../models/User";
import ProtectedUserRequest from "../../../types/types";

const updateProfileController = async (
  req: ProtectedUserRequest,
  res: Response
) => {
  const email = req.user?.email;

  const { name, phone, bio, interests, calendlyLink, orgId } = req.body;

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

  await User.findOneAndUpdate(
    { email: email },
    {
      name,
      phone,
      bio,
      interests,
      calendlyLink,
      orgId,
      isProfileComplete: true,
    }
  );

  res.send("User profile updated");
  return;
};

export default updateProfileController;
