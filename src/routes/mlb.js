const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { parseCSV } = require('../utils/csvParser');

router.get('/pitches', async (req, res) => {
  try {
    const { pitcher_id, start_date, end_date } = req.query;

    const url = `https://baseballsavant.mlb.com/statcast_search/csv?hfPT=&hfAB=&hfGT=R%7C&hfPR=&hfZ=&hfStadium=&hfBBL=&hfNewZones=&hfPull=&hfC=&hfSea=2024%7C&hfSit=&player_type=pitcher&hfOuts=&hfOpponent=&pitcher_throws=&batter_stands=&hfSA=&game_date_gt=${start_date || '2024-04-01'}&game_date_lt=${end_date || '2024-04-30'}&hfInfield=&team=&position=&hfRO=&home_road=&hfFlag=&metric_1=&hfInn=&min_pitches=0&min_results=0&group_by=name&sort_col=pitches&player_event_sort=api_p_release_speed&sort_order=desc&min_pas=0&pitchers_lookup%5B%5D=${pitcher_id}&type=details&`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const csv = await response.text();
    const data = parseCSV(csv);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
