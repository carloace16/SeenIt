import express from "express";
import { getAllShows, getShowById } from "../controllers/shows.js";

const router = express.Router();

router.get("/", getAllShows);
router.get("/:id", getShowById);

export default router;
