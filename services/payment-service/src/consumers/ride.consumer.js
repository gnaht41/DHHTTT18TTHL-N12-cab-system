const kafka = require('../config/kafka');
const handleRideCompleted = require('../services/payment.service');

async function startConsumer() {

  const consumer = kafka.consumer({ groupId: 'payment-group' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'RideCompleted' });

  console.log("✅ Payment Consumer is listening to RideCompleted...");

  await consumer.run({
  eachMessage: async ({ message }) => {

    const data = JSON.parse(message.value.toString());

    const result = await handleRideCompleted(data.rideId, data.amount);
         console.log(`
====================================
📩 RideCompleted Event Received
Ride ID: ${data.rideId}
Amount: ${data.amount}
====================================
`);

    if (result.status === "CREATED") {
      console.log("💳 Payment processed successfully");
    } else {
      console.log("⚠ Payment already exists");
    }
  },
});
}

module.exports = startConsumer;