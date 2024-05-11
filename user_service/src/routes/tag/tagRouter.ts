import express from "express";
import addNewTagController from "../../controllers/tag/addNewTagController";
import getTagByNameController from "../../controllers/tag/getTagByNameController";
import getAllTagsController from "../../controllers/tag/getAllTagsController";

const router = express.Router();

// POST /
router.post("/", addNewTagController);

// GET /all
router.get("/all", getAllTagsController);

// GET /?name="health"
router.get("/", getTagByNameController);

export default router;
