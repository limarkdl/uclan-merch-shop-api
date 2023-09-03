import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Import routes
import userRoutes from './src/routes/userRoutes.js';
// import roleRoutes from "./routes/roleRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import offerRoutes from "./routes/offerRoutes.js";


// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors()); // Handle CORS
app.use(express.json()); // Parse JSON payloads

// Routes
app.use('/users', userRoutes);
// app.use('/roles', roleRoutes);
// app.use('/products', productRoutes);
// app.use('/orders', orderRoutes);
// app.use('/offers', offerRoutes);

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).send('Sorry, that route doesn\'t exist.');
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Listening at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
