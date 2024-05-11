import express from "express";
import updateProfileController from "../../../controllers/user/protected/updateProfileController";

const router = express.Router();

// PUT /updateprofile
router.put("/updateprofile", updateProfileController);

export default router;
