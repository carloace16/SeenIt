import { pool } from "../config/database.js";

// GET all categories FOR A SPECIFIC USER
export const getAllCategories = async (req, res) => {
  // We get the user_id from the URL params
  const { user_id } = req.params;
  try {
    const results = await pool.query(
      "SELECT * FROM categories WHERE user_id = $1 ORDER BY name ASC",
      [user_id]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// GET one category by ID
export const getCategoryById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // We can't let a user see a category if it's not theirs.
    // We'll add a user_id check here later when auth is real.
    const results = await pool.query("SELECT * FROM categories WHERE id = $1", [
      id,
    ]);

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// CREATE a new category
export const createCategory = async (req, res) => {
  // We now require a user_id to be passed in the body
  const { name, image_url, user_id } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO categories (name, image_url, user_id) VALUES ($1, $2, $3) RETURNING *",
      [name, image_url, user_id]
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// UPDATE a category by ID
export const updateCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, image_url, user_id } = req.body; // user_id for security
  try {
    const results = await pool.query(
      // We ONLY update the category IF the user_id matches
      "UPDATE categories SET name = $1, image_url = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [name, image_url, id, user_id]
    );

    if (results.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Category not found or you do not have permission" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// DELETE a category by ID
export const deleteCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  const { user_id } = req.body; // user_id for security
  try {
    // We ONLY delete the category IF the user_id matches
    const results = await pool.query(
      "DELETE FROM categories WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, user_id]
    );

    if (results.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Category not found or you do not have permission" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
