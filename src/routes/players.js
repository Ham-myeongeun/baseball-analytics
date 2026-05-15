const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/search', async (req, res) => {
  try {
    const { name } = req.query;
    const url = `https://statsapi.mlb.com/api/v1/people/search?names=${encodeURIComponent(name)}&sportId=1`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.people || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
