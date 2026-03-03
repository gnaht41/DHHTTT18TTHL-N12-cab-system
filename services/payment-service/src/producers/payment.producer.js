const kafka = require('../config/kafka');

const producer = kafka.producer();

async function publishPaymentSuccess(payment) {

  await producer.connect();

  await producer.send({
    topic: 'PaymentSuccess',
    messages: [{ value: JSON.stringify(payment) }],
  });

  await producer.disconnect();
}

module.exports = publishPaymentSuccess;