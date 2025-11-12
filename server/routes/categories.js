import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.js";

const router = express.Router();

// GET all categories
router.get("/", getAllCategories);

// GET a single category by its ID
router.get("/:id", getCategoryById);

// POST (create) a new category
router.post("/", createCategory);

// PATCH (update) an existing category
router.patch("/:id", updateCategory); // Using PATCH for updates

// DELETE an existing category
router.delete("/:id", deleteCategory);

export default router;
