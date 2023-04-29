import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { productRouter } from './routes/productRouter';
import { seedRouter } from './routes/seedRouter';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/kicksavenuedb';
mongoose.set('strictQuery', true);
mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('Succesful connection to MongoDB!');
	})
	.catch(() => {
		console.log('Something went wrong.');
	});

const app = express();
app.use(
	cors({
		credentials: true,
		origin: ['http://localhost:3000'],
	})
);

app.use('/api/products', productRouter);
// app.use('/api/seed', seedRouter);

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`);
});
