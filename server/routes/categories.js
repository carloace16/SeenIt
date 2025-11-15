import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.js";

const router = express.Router();

// --- THIS LINE IS UPDATED ---
router.get("/user/:user_id", getAllCategories); // Now gets categories for a specific user
// -----------------------------

router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
