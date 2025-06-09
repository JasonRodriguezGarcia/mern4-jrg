import { Kafka } from 'kafkajs';
import connectDB from './db-mongodb.js';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:29092'],  // Connect to Kafka on localhost:9092
});

const consumer = kafka.consumer({ groupId: 'test-group' });
// Connect to MongoDB
// const db = await connectDB();
// const collection = db.collection('acciones'); 

const run = async () => {
  await consumer.connect();
  console.log('Consumer connected to Kafka');
// Connect to MongoDB
  const db = await connectDB();
  const collection = db.collection('acciones'); 
  // Subscribe to the topic "test-topic"
  await consumer.subscribe({ topic: 'acciones-topic', fromBeginning: true });

  // Consume messages from the topic
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
      const results = message.value
      console.log("mostrando results: ", results.toString())
      const resultado = await collection.insertOne(JSON.parse(results))
      console.log("imprimo resultado: ", resultado)

    },
  });
};

run().catch(console.error);