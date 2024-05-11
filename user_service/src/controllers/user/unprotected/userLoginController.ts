import { Request, Response } from "express";
import User from "../../../models/User";
import sendMail from "../../../utils/sendEmail";

const userLoginController = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).send("'email' is required in body");
  }

  // Check if this email already exists
  const userDoc = await User.findOne({
    email: email,
  });

  const otp = (
    Math.round(Math.random() * 1000000).toString() + "0000000000"
  ).slice(0, 6);

  if (!userDoc) {
    // If new login for user, create a doc
    const newUser = new User({
      currentOtp: otp,
      email: email,
    });
    await newUser.save();
  } else {
    userDoc.currentOtp = otp;
    await userDoc.save();
  }

  //  Send out email with OTP
  await sendMail(
    email,
    "Hello. Here is your OTP",
    `Your login OTP is ${otp}. Please refrain sharing. Thanks`,
    ""
  );

  res.send("OTP sent to email!");
  return;
};

export default userLoginController;
