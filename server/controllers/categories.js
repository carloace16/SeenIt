import { pool } from "../config/database.js";

// GET all categories
export const getAllCategories = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM categories ORDER BY name ASC"
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
// CREATE a new category
export const createCategory = async (req, res) => {
  // Now also getting image_url
  const { name, image_url } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO categories (name, image_url) VALUES ($1, $2) RETURNING *",
      [name, image_url] // Pass image_url to the query
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// UPDATE a category by ID
export const updateCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  // Now also getting image_url
  const { name, image_url } = req.body;
  try {
    const results = await pool.query(
      "UPDATE categories SET name = $1, image_url = $2 WHERE id = $3 RETURNING *",
      [name, image_url, id] // Pass image_url to the query
    );

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// DELETE a category by ID
export const deleteCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    // NOTE: Because of 'ON DELETE SET NULL' in our 'shows' table,
    // deleting a category will not delete the shows. It will just
    // set their 'category_id' to null. This is perfect.
    const results = await pool.query(
      "DELETE FROM categories WHERE id = $1 RETURNING *",
      [id]
    );

    if (results.rowCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(results.rows[0]); // Send back the deleted category
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
