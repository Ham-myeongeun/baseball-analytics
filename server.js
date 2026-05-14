const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mlbRouter = require('./src/routes/mlb');
const playersRouter = require('./src/routes/players');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/mlb', mlbRouter);
app.use('/api/players', playersRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`서버 실행중: ${PORT}`));