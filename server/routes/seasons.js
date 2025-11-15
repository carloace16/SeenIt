import express from "express";
import {
  getSeasonById, // <-- 1. Import new function
  getSeasonsByShowId,
  createSeason,
  updateSeason,
  deleteSeason,
} from "../controllers/seasons.js";

const router = express.Router();

router.get("/byshow/:show_id", getSeasonsByShowId); // Get seasons for a show
router.get("/:id", getSeasonById); // <-- 2. Add new route
router.post("/", createSeason); // Create a new season
router.patch("/:id", updateSeason); // Update a season
router.delete("/:id", deleteSeason); // Delete a season

export default router;
