import express, { Request, Response } from 'express';
import { ProductModel } from '../models/ProductModel';
import asyncHandler from 'express-async-handler';
import { ProductListData, Users } from '../data/ProductListData';
import { UserModel } from '../models/UserModel';

export const seedRouter = express.Router();

seedRouter.get(
	'/',
	asyncHandler(async (req: Request, res: Response) => {
		await ProductModel.deleteMany({});
		const createdProducts = await ProductModel.insertMany(ProductListData);
		await UserModel.deleteMany({});
		const createdUsers = await UserModel.insertMany(Users);
		res.send({ createdProducts, createdUsers });
	})
);
