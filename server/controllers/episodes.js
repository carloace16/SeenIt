import { pool } from "../config/database.js";

// GET all episodes for a specific season
export const getEpisodesBySeasonId = async (req, res) => {
  try {
    const season_id = parseInt(req.params.season_id);
    const results = await pool.query(
      "SELECT * FROM episodes WHERE season_id = $1 ORDER BY episode_number ASC",
      [season_id]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// CREATE a new episode for a season
export const createEpisode = async (req, res) => {
  // We get title, number, and the season_id it belongs to
  const { title, episode_number, season_id } = req.body;
  try {
    const results = await pool.query(
      `INSERT INTO episodes (title, episode_number, season_id) 
             VALUES ($1, $2, $3) 
             RETURNING *`,
      [title, episode_number, season_id]
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// UPDATE an episode by its ID
export const updateEpisode = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, episode_number } = req.body;
  try {
    const results = await pool.query(
      `UPDATE episodes 
             SET title = $1, episode_number = $2
             WHERE id = $3 RETURNING *`,
      [title, episode_number, id]
    );
    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Episode not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// DELETE an episode by its ID
export const deleteEpisode = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    // Because of "ON DELETE CASCADE", deleting an episode
    // will automatically delete all its watch logs.
    const results = await pool.query(
      "DELETE FROM episodes WHERE id = $1 RETURNING *",
      [id]
    );
    if (results.rowCount === 0) {
      return res.status(404).json({ message: "Episode not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
