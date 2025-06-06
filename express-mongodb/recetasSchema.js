import { ObjectId } from 'mongodb';


// ! indica que es obligatorio
export const typeDefs = /* GraphQL */ `
  type Receta {
    _id: ID!
    nombreReceta: String!
    dificultad: String!
    tiempo: Int
  }


  type Query {
    recetas: [Receta!]!  
    receta(id: ID!): Receta
  }

  input RecetaInput {
    nombreReceta: String!
    dificultad: Int
    tiempo: Int
  }

  type Mutation {
    addReceta(input: RecetaInput!): Receta!
    updateReceta(id: ID!, input: RecetaInput!): Receta
    deleteReceta(id: ID!): Boolean
  }

  type Query {
    recetas: [Receta!]!
    receta(id: ID!): Receta
    recetasConBajaCantidad: [Receta!]!  # 👈 Nueva query
  }
`;



export const resolvers = {
  Query: {
    // pedimos todos los recetas
    recetas: async (_parent, args, context) => {
      const db = context.db;

      const query = {}
      // if (args.cantidadMin !== undefined) {
      //   query.cantidad = {$gte: args.cantidadMin}
      // }
      return await db.collection('recetas').find(query).toArray();
    },
    // pedimos uno
    receta: async (_parent, { id }, context) => {
      const db = context.db;
      return await db.collection('recetas').findOne({ _id: new ObjectId(id) });
    },
    recetasConBajaCantidad: async (_parent, _args, context) => {
        const db = context.db;
        return await db.collection('recetas').find({ cantidad: { $lt: 100 } }).toArray();
    },

  },
  Mutation: {
    addReceta: async (_parent, { input }, context) => {
      const db = context.db;
      const now = new Date();
      const receta = { ...input }; //, createdAt: now.toISOString(), updatedAt: now.toISOString() };
      const result = await db.collection('recetas').insertOne(receta);
      return { _id: result.insertedId, ...receta };
    },

    updateReceta: async (_parent, { id, input }, context) => {
      const db = context.db;
      //const now = new Date();
      const updateResult = await db.collection('recetas').findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...input} }, //, updatedAt: now.toISOString() } },
        { returnDocument: 'after' }
      );
      return updateResult.value;
    },
    deleteReceta: async (_parent, { id }, context) => {
      const db = context.db;
      const result = await db.collection('recetas').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    },
  },
};