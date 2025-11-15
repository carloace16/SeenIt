import { pool } from "../config/database.js";

// --- THIS IS THE NEW FUNCTION ---
// GET one season by ID
export const getSeasonById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const results = await pool.query("SELECT * FROM seasons WHERE id = $1", [
      id,
    ]);

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Season not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
// ---------------------------------

// GET all seasons for a specific show
export const getSeasonsByShowId = async (req, res) => {
  try {
    const show_id = parseInt(req.params.show_id);
    const results = await pool.query(
      "SELECT * FROM seasons WHERE show_id = $1 ORDER BY season_order ASC",
      [show_id]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// CREATE a new season for a show
export const createSeason = async (req, res) => {
  const { title, season_order, cover_image_url, show_id } = req.body;
  try {
    const results = await pool.query(
      `INSERT INTO seasons (title, season_order, cover_image_url, show_id) 
             VALUES ($1, $2, $3, $4) 
             RETURNING *`,
      [title, season_order, cover_image_url, show_id]
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// UPDATE a season by its ID
export const updateSeason = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, season_order, cover_image_url } = req.body;
  try {
    const results = await pool.query(
      `UPDATE seasons 
             SET title = $1, season_order = $2, cover_image_url = $3
             WHERE id = $4 RETURNING *`,
      [title, season_order, cover_image_url, id]
    );
    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Season not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// DELETE a season by its ID
export const deleteSeason = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const results = await pool.query(
      "DELETE FROM seasons WHERE id = $1 RETURNING *",
      [id]
    );
    if (results.rowCount === 0) {
      return res.status(404).json({ message: "Season not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// --- MAKE SURE TO EXPORT THE NEW FUNCTION ---
export default {
  getSeasonById, // Added this
  getSeasonsByShowId,
  createSeason,
  updateSeason,
  deleteSeason,
};
