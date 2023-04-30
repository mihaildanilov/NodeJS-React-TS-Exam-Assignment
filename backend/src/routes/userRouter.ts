import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { User, UserModel } from '../models/UserModel';
import { generateToken } from '../utils/utils';

export const userRouter = express.Router();
// POST /api/users/signin
userRouter.post(
	'/signin',
	asyncHandler(async (req: Request, res: Response) => {
		const user = await UserModel.findOne({ email: req.body.email });
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				res.json({
					_id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
					token: generateToken(user),
				});
				return;
			}
		}
		res.status(401).json({ message: 'Invalid email or password' });
	})
);

userRouter.post(
	'/signup',
	asyncHandler(async (req: Request, res: Response) => {
		const password = req.body.password;
		if (!password || typeof password !== 'string') {
			throw new Error('Invalid password');
		}
		const user = await UserModel.create({
			name: req.body.name,
			email: req.body.email,
			password: bcrypt.hashSync(password),
		} as User);
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user),
		});
	})
);
