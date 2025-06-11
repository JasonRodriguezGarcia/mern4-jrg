import { Kafka } from 'kafkajs';

const kafka = new Kafka({ clientId: 'my-app', brokers: ['localhost:29092'] });
const consumer = kafka.consumer({ groupId: 'test-group' });

async function run() {
  await consumer.connect();

  await consumer.subscribe({ topic: 'banco', fromBeginning: true });

  // Assign specific partition
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (partition === 1) {

        if (message.value >= 1000)
            console.log("Fraude en retiro")
        console.log("Retirada", {
            partition,
            offset: message.offset,
            value: message.value.toString(),
        });
      }
    },
  });
}

run().catch(console.error);