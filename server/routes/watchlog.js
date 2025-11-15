import express from "express";
import { getWatchLog, toggleWatchStatus } from "../controllers/watchlog.js";

const router = express.Router();

router.get("/user/:user_id", getWatchLog); // Gets all watched IDs for a user
router.post("/toggle", toggleWatchStatus); // The smart "toggle" function

export default router;
