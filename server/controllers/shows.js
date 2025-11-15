import { pool } from "../config/database.js";

// --- NEW FUNCTION ---
// GET all shows FOR A SPECIFIC CATEGORY
export const getShowsByCategoryId = async (req, res) => {
  try {
    const category_id = parseInt(req.params.category_id);
    const results = await pool.query(
      "SELECT * FROM shows WHERE category_id = $1 ORDER BY title ASC",
      [category_id]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// GET all shows
export const getAllShows = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM shows ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// GET a single show by ID
export const getShowById = async (req, res) => {
  try {
    const showId = req.params.id;
    const results = await pool.query("SELECT * FROM shows WHERE id = $1", [
      showId,
    ]);

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Show not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// CREATE a new show
export const createShow = async (req, res) => {
  const { title, description, cover_image_url, category_id } = req.body;
  try {
    const results = await pool.query(
      `INSERT INTO shows (title, description, cover_image_url, category_id) 
             VALUES ($1, $2, $3, $4) 
             RETURNING *`,
      [title, description, cover_image_url, category_id]
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// UPDATE a show by ID
export const updateShow = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, cover_image_url, category_id } = req.body;
  try {
    const results = await pool.query(
      `UPDATE shows 
             SET title = $1, description = $2, cover_image_url = $3, category_id = $4
             WHERE id = $5 RETURNING *`,
      [title, description, cover_image_url, category_id, id]
    );
    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Show not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// DELETE a show by ID
export const deleteShow = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const results = await pool.query(
      "DELETE FROM shows WHERE id = $1 RETURNING *",
      [id]
    );
    if (results.rowCount === 0) {
      return res.status(404).json({ message: "Show not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Export the new function
export default {
  getAllShows,
  getShowById,
  getShowsByCategoryId, // <-- New export
  createShow,
  updateShow,
  deleteShow,
};
