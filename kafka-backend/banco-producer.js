import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:29092'],
});

const producer = kafka.producer();

async function run() {
  await producer.connect();

  // Send message explicitly to partition 0
  await producer.send({
    topic: 'banco',
    messages: [
    //   { key: 'ingreso', value: '200', partition: 0 },
    //   { key: 'retiro', value: '100', partition: 1 },
    //   { key: 'retiro', value: '50', partition: 1 },
    //   { key: 'ingreso', value: '1500', partition: 0 },
      { key: 'ingreso', value: (100 + Math.random() * 1000).toFixed(2).toString(), partition: 0 },  // Random price between 100 and 1100,
      { key: 'gasto', value: (100 + Math.random() * 1000).toFixed(2).toString(), partition: 1 }  // Random price between 100 and 1100,
    ],
  });

  await producer.disconnect();
}
setInterval(()=> {
    run()
}, 2000)
// run().catch(console.error);
