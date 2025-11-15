import { pool } from "../config/database.js";

// GET all watched episode IDs for a specific user
export const getWatchLog = async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const results = await pool.query(
      "SELECT episode_id FROM user_watched_log WHERE user_id = $1",
      [user_id]
    );
    // Send back just an array of the IDs, like [1, 5, 12]
    res.status(200).json(results.rows.map((row) => row.episode_id));
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// CREATE or DELETE a "watched" status (toggles it)
export const toggleWatchStatus = async (req, res) => {
  const { user_id, episode_id, watched_date } = req.body;

  try {
    // First, try to find if this log already exists
    const existing = await pool.query(
      "SELECT * FROM user_watched_log WHERE user_id = $1 AND episode_id = $2",
      [user_id, episode_id]
    );

    if (existing.rows.length > 0) {
      // It EXISTS, so we DELETE it (mark as unwatched)
      await pool.query(
        "DELETE FROM user_watched_log WHERE user_id = $1 AND episode_id = $2",
        [user_id, episode_id]
      );
      res.status(200).json({ status: "unwatched", episode_id: episode_id });
    } else {
      // It does NOT exist, so we CREATE it (mark as watched)
      const results = await pool.query(
        `INSERT INTO user_watched_log (user_id, episode_id, watched_date) 
                 VALUES ($1, $2, $3) 
                 RETURNING *`,
        [user_id, episode_id, watched_date]
      );
      res.status(201).json({ status: "watched", episode: results.rows[0] });
    }
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
