import express from "express";
import addNewOrganizationController from "../../controllers/organization/addNewOrganizationController";
import getOrganizationByNameController from "../../controllers/organization/getOrganizationByNameController";

const router = express.Router();

// POST /
router.post("/", addNewOrganizationController);

// GET /?name="google"
router.get("/", getOrganizationByNameController);

export default router;
