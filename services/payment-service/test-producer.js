const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'test-producer',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

async function send() {
  await producer.connect();

  await producer.send({
    topic: 'RideCompleted',
    messages: [
      {
        value: JSON.stringify({
          rideId: 'ride-local-2',
          amount: 250000,
        }),
      },
    ],
  });

  console.log('RideCompleted event sent');

  await producer.disconnect();
}

send();