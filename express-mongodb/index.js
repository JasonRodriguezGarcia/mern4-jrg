import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { Server as SocketIOServer } from "socket.io";
import connectDB from './db-mongodb.js';  // Import your MongoDB connection module
import chatsRouter from './routes/chats.js'
import seguridadRouter from './routes/seguridad.js'
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/v1/seguridad', seguridadRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

async function startServer() {

  // Connect to MongoDB and store the DB instance in app.locals
  const db = await connectDB();
  app.locals.db = db; // saving database globally

  app.use('/api/v1/chats', chatsRouter)

  try {
    
    // Create HTTP server from express app
    const httpServer = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

 
  }

  catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
}

startServer();