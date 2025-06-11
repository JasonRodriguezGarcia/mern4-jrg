
import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

// --- Kafka setup ---
const kafka = new Kafka({
  clientId: 'graphql-api',
  brokers: ["localhost:29092"],  // place un .env file
});

const producer = kafka.producer();

await producer.connect();

// --- GraphQL schema ---
export const typeDefs = /* GraphQL */ `
  type PostLike {
    id: Int
    accion: String!
    fecha: String
  }

  input PostLikeInput {
    id: Int
    accion: String!
    fecha: String
  }

  type Mutation {
    addPostLike(input: PostLikeInput!): Boolean
  }

  type Query {
    hello: String
  }
`;

// --- GraphQL resolvers ---
export const resolvers = {
  Query: {
    hello: () => 'Kafka + GraphQL is working!',
  },
  Mutation: {
    addPostLike: async (_parent, { input }) => {
      await consumer.send({
        topic: 'likes',
        messages: [{ value: JSON.stringify({ input }) }],
      });
      return true;
    },    
    // addProducto: async (_parent, { input }) => {
    //   await producer.send({
    //     topic: 'productos',
    //     messages: [{ value: JSON.stringify({ type: 'add', data: input }) }],
    //   });
    //   return true;
    // },
    // updateProducto: async (_parent, { id, input }) => {
    //   await producer.send({
    //     topic: 'productos',
    //     messages: [{ value: JSON.stringify({ type: 'update', id, data: input }) }],
    //   });
    //   return true;
    // },
    // deleteProducto: async (_parent, { id }) => {
    //   await producer.send({
    //     topic: 'productos',
    //     messages: [{ value: JSON.stringify({ type: 'delete', id }) }],
    //   });
    //   return true;
    // },
  },
};