import express from "express";
import addNewTagController from "../../controllers/tag/addNewTagController";
import getTagByNameController from "../../controllers/tag/getTagByNameController";

const router = express.Router();

// POST /
router.post("/", addNewTagController);

// GET /?name="health"
router.get("/", getTagByNameController);

export default router;
