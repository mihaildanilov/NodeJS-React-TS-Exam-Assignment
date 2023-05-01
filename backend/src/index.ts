import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { productRouter } from './routes/productRouter';
import { seedRouter } from './routes/seedRouter';
import { userRouter } from './routes/userRouter';
import { orderRouter } from './routes/orderRouter';
import { keyRouter } from './routes/keyRouter';

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/seed', seedRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/keys', keyRouter);

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`);
});
