import express from 'express';
import mongoose from 'mongoose';
import authRouter from './authRouter.js';

import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/auth', authRouter);


const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        app.listen(PORT, () => {
            console.log(`Listening at http://localhost:${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();