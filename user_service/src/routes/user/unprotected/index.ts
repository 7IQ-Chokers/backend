import express from "express";
import userLoginController from "../../../controllers/user/userLoginController";

const router = express.Router();

// POST /login
router.post("/login", userLoginController);

// POST /submitotp
// router.post("/submitotp", submitOtpController);

export default router;
