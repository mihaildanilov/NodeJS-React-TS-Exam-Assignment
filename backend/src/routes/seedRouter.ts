import express, { Request, Response } from 'express';
import { ProductModel } from '../models/ProductModel';
import asyncHandler from 'express-async-handler';
import { ProductListData } from '../data/ProductListData';

export const seedRouter = express.Router();

seedRouter.get(
	'/',
	asyncHandler(async (req: Request, res: Response) => {
		await ProductModel.deleteMany({});
		const createProducts = await ProductModel.insertMany(ProductListData);
		res.send({ createProducts });
	})
);
