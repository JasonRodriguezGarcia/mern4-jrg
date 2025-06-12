
import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

// --- Kafka setup ---
const kafka = new Kafka({
  clientId: 'graphql-fraude',
  brokers: ["localhost:29092"],  // place un .env file
});

const consumer = kafka.consumer({ groupId: 'test-group' });
// const consumer = kafka.consumer();
const transacciones = []
await consumer.connect();

await consumer.subscribe({ topic: 'banco', fromBeginning: true });

// Assign specific partition
await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
      if (partition === 1 && message.value >= 1000) {
        console.log("Retirada FRAUDULENTA !!", {
          partition,
          value: message.value.toString(),
        });
        const cantidad = message.value.toString()
        transacciones.push({cantidad})
      }
  },
});

// --- GraphQL schema ---
export const typeDefs = /* GraphQL */ `
  type Transaccion {
    cantidad: Float!
  }

  type Query {
    transacciones: [Transaccion!]
  }
`;

// PROBAREMOS EL QUERY EN http://localhost:5001/graphql
// query {
//     transacciones {cantidad}
//   }
// --- GraphQL resolvers ---
export const resolvers = {
  Query: {
    transacciones: () => transacciones, // devolvemos las transacciones
  },
};

