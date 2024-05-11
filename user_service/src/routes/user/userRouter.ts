import express from "express";
import userProtectedRouter from "./protected";
import userUnprotectedRouter from "./unprotected";
import verifyUserJWT from "../../utils/verifyUserJWT";

const router = express.Router();

router.use("/protected", verifyUserJWT, userProtectedRouter);
router.use("/", userUnprotectedRouter);

export default router;
