import express from "express";
import updateProfileController from "../../../controllers/user/protected/updateProfileController";
import toggleIsInvestorController from "../../../controllers/user/protected/toggleIsInvestorController";

const router = express.Router();

// PUT /updateprofile
router.put("/updateprofile", updateProfileController);

// PUT /toggleisinvestor
router.put("/toggleisinvestor", toggleIsInvestorController);

export default router;
