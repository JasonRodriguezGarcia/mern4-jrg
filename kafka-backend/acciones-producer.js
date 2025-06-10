import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app-producer',
  brokers: ['localhost:29092'],  // Connect to Kafka on localhost:9092
});

const producer = kafka.producer();
const acciones = ['AAPL', 'GOOGL', 'TSLA', 'AMZN', 'MSFT'];

const run = async () => {
  await producer.connect();
  const accionUpdate = {
    symbol: acciones[Math.floor(Math.random() * acciones.length)],
    price: (100 + Math.random() * 1000).toFixed(2),  // Random price between 100 and 1100
    timestamp: new Date().toISOString(),
  };
  console.log('Producer connected to Kafka');

  // Sending messages to the topic "test-topic"
    await producer.send({
      topic: 'acciones-topic',
      messages: 
      [
        { value: JSON.stringify(accionUpdate) },
      ],
    });

  console.log('Message sent to Kafka topic "test-topic"');

  await producer.disconnect();
}

setInterval(()=> {
  run();

}, 3000)