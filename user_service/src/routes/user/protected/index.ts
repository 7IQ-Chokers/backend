import express from "express";
import updateProfileController from "../../../controllers/user/protected/updateProfileController";
import toggleIsInvestorController from "../../../controllers/user/protected/toggleIsInvestorController";
import getProfileController from "../../../controllers/user/protected/getProfileController";

const router = express.Router();

// PUT /updateprofile
router.put("/updateprofile", updateProfileController);

// PUT /toggleisinvestor
router.put("/toggleisinvestor", toggleIsInvestorController);

// GET /profile
router.get("/profile", getProfileController);

export default router;
