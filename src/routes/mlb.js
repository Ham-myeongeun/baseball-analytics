const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { parseCSV } = require('../utils/csvParser');

// 투구/타구/낙구 데이터
router.get('/pitches', async (req, res) => {
    try {
        const { pitcher_id, start_date, end_date } = req.query;

        const params = new URLSearchParams({
            hfSea: '2024|',
            player_type: 'pitcher',
            game_date_gt: start_date || '2024-04-01',
            game_date_lt: end_date   || '2024-09-30',
            'pitchers_lookup[]': pitcher_id,
            type: 'details',
            min_pitches: '0',
        });

        const url = `https://baseballsavant.mlb.com/statcast_search/csv?${params}`;
        const response = await fetch(url);
        const csv = await response.text();
        const data = parseCSV(csv);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;