import express from "express";
import userLoginController from "../../../controllers/user/unprotected/userLoginController";
import submitOtpController from "../../../controllers/user/unprotected/submitOtpController";

const router = express.Router();

// POST /login
router.post("/login", userLoginController);

// POST /submitotp
router.post("/submitotp", submitOtpController);

export default router;
