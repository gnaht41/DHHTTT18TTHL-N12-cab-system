require('dotenv').config();
const express = require('express');
const pool = require('./config/db');
const startConsumer = require('./consumers/ride.consumer');

const app = express();

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS payments (
      id UUID PRIMARY KEY,
      ride_id VARCHAR(255) UNIQUE,
      amount NUMERIC,
      status VARCHAR(50)
    );
  `);
}

app.get('/health', (req, res) => {
  res.json({ status: 'Payment Service OK' });
});

app.listen(process.env.PORT, async () => {
  console.log(`Payment Service running on port ${process.env.PORT}`);
  await initDB();
  await startConsumer();
});