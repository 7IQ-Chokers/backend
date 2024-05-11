import { Request, Response } from "express";
import User from "../../../models/User";
import jwt from "jsonwebtoken";
import configs from "../../../config/config";

const submitOtpController = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400).send("'email' and 'otp' are required in body");
    return;
  }

  const userDoc = await User.findOne({
    email: email,
  });

  if (userDoc) {
    if (userDoc.currentOtp === otp) {
      userDoc.currentOtp = "";
      await userDoc.save();

      const loginJwt = jwt.sign({ email: userDoc.email }, configs.jwt_secret, {
        expiresIn: "30d",
      });

      res.json({
        message: "Login success",
        jwt: loginJwt,
        isProfileComplete: userDoc.isProfileComplete,
      });
      return;
    } else {
      res.status(401).send("OTP invalid!");
      return;
    }
  } else {
    res.status(500).send("Unknown error. User not found");
    return;
  }
};

export default submitOtpController;
