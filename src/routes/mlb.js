const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

router.get('/pitches', async (req, res) => {
  try {
    const { player_id, start_date, end_date } = req.query;

    const result = await pool.query(`
      SELECT pitch_type, plate_x, plate_z, hc_x, hc_y,
             description, events, launch_angle, launch_speed, hit_distance
      FROM pitches
      WHERE player_id = $1
        AND game_date >= $2
        AND game_date <= $3
    `, [
      player_id || 660271,
      start_date || '2024-04-01',
      end_date   || '2024-04-30'
    ]);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;