const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const publishPaymentSuccess = require('../producers/payment.producer');

async function handleRideCompleted(rideId, amount) {

  const check = await pool.query(
    'SELECT * FROM payments WHERE ride_id = $1',
    [rideId]
  );

  if (check.rows.length > 0) {
    return { status: "EXISTS" };
  }

  const id = uuidv4();

  await pool.query(
    'INSERT INTO payments (id, ride_id, amount, status) VALUES ($1, $2, $3, $4)',
    [id, rideId, amount, 'SUCCESS']
  );

  await publishPaymentSuccess({
    paymentId: id,
    rideId,
    amount,
    status: 'SUCCESS'
  });

  return { status: "CREATED" };
}

module.exports = handleRideCompleted;