import express from "express";
import {
  getEpisodesBySeasonId,
  createEpisode,
  updateEpisode,
  deleteEpisode,
} from "../controllers/episodes.js";

const router = express.Router();

router.get("/byseason/:season_id", getEpisodesBySeasonId); // Get episodes for a season
router.post("/", createEpisode); // Create a new episode
router.patch("/:id", updateEpisode); // Update an episode
router.delete("/:id", deleteEpisode); // Delete an episode

export default router;
