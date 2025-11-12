import { pool } from "../config/database.js";

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
