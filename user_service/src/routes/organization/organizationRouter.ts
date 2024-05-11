import express from "express";
import verifyUserJWT from "../../utils/verifyUserJWT";
import addNewOrganizationController from "../../controllers/organization/addNewOrganizationController";

const router = express.Router();

// POST /
router.post("/", addNewOrganizationController);

// GET /?name="google"
// router.get("/", addNewOrganizationController);

export default router;
