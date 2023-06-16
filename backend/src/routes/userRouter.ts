/* eslint-disable @typescript-eslint/no-non-null-assertion */
import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { User, UserModel } from '../models/UserModel';
import { generateToken, isAuth } from '../utils/utils';
import jwt from 'jsonwebtoken';

/* 
POST /api/users/signin allows users to sign in to the application by providing their email and password. If the credentials are valid, a JWT is generated and returned to the client.

POST /api/users/signup allows users to sign up for the application by providing their name, email, and password. If the information is valid, a new user document is created in the database and a JWT is generated and returned to the client.

GET /api/users/profile retrieves the user's profile information. This endpoint requires a valid JWT to be included in the request header.

PUT /api/users/profile allows the user to update their profile information. This endpoint requires a valid JWT to be included in the request header.

GET /api/users/:id retrieves a user's profile information by ID. This endpoint requires a valid JWT with admin privileges to be included in the request header.

DELETE /api/users/:id deletes a user's profile by ID. This endpoint requires a valid JWT with admin privileges to be included in the request header.

GET /api/users retrieves all users. This endpoint requires a valid JWT with admin privileges to be included in the request header.

POST /api/users/:id/change-password allows an admin to change a user's password by ID. This endpoint requires a valid JWT with admin privileges to be included in the request header.

PUT /api/users/:id allows an admin to update a user's profile information by ID. This endpoint requires a valid JWT with admin privileges to be included in the request header.
*/

export const userRouter = express.Router();
// POST /api/users/signin allows users to sign in to the application by providing their email and password
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
					subscribedToNewsletter: user.subscribedToNewsletter,
					token: generateToken(user),
				});
				return;
			}
		}
		res.status(401).json({ message: 'Invalid email or password' });
	})
);
//POST /api/users/signup allows users to sign up for the application by providing their name, email, and password.
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

// PUT /api/users/profile used by a user to update their own information
userRouter.put(
	'/profile',
	isAuth,
	asyncHandler(async (req: Request, res: Response) => {
		const user = await UserModel.findById(req.user._id);
		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;
			if (req.body.password) {
				user.password = bcrypt.hashSync(req.body.password);
			}
			user.subscribedToNewsletter =
				req.body.subscribedToNewsletter ?? user.subscribedToNewsletter; // Update the subscription status
			const updatedUser = await user.save();
			const token = jwt.sign({ userId: updatedUser._id }, process.env.JWT_SECRET!, {
				expiresIn: '1d',
			});
			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				subscribedToNewsletter: updatedUser.subscribedToNewsletter,
				token,
			});
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	})
);

// GET /api/users/:id retrieves a user's profile information by ID.
// userRouter.get(
// 	'/:id',
// 	isAuth,
// 	asyncHandler(async (req: Request, res: Response) => {
// 		const user = await UserModel.findById(req.params.id);
// 		console.log(`User endpoint called with ID: ${req.params.id}`);
// 		if (user) {
// 			res.json({
// 				_id: user._id,
// 				name: user.name,
// 				email: user.email,
// 				isAdmin: user.isAdmin,
// 				subscribedToNewsletter: user.subscribedToNewsletter,
// 			});
// 		} else {
// 			res.status(404).json({ message: 'User not found' });
// 		}
// 	})
// );

//DELETE /api/users/:id Deletes a specific user by their ID.
userRouter.delete(
	'/:id',
	asyncHandler(async (req: Request, res: Response) => {
		const user = await UserModel.findById(req.params.id);
		if (user) {
			await user.removeUser();
			res.json({ message: 'User removed' });
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	})
);
// GET /api/users: Retrieves all users.
userRouter.get(
	'/',
	asyncHandler(async (req: Request, res: Response) => {
		const users = await UserModel.find({});
		res.json(users);
	})
);

userRouter.put(
	'/:id',
	isAuth,
	asyncHandler(async (req: Request, res: Response) => {
		const user = await UserModel.findById(req.params.id);
		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;

			if (user.isAdmin) {
				user.isAdmin = false;
			} else {
				user.isAdmin = true;
			}

			const updatedUser = await user.save();
			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
			});
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	})
);
