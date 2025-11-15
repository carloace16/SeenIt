import express from "express";
import {
  getAllShows,
  getShowById,
  getShowsByCategoryId, // <-- New import
  createShow,
  updateShow,
  deleteShow,
} from "../controllers/shows.js";

const router = express.Router();

router.get("/", getAllShows);
router.get("/bycategory/:category_id", getShowsByCategoryId); // <-- New route
router.get("/:id", getShowById);
router.post("/", createShow);
router.patch("/:id", updateShow);
router.delete("/:id", deleteShow);

export default router;
