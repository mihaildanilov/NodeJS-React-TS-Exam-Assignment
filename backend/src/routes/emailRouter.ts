import express, { Request, Response } from 'express';
import { sendEmail } from '../services/email';
import { UserModel } from '../models/UserModel';
import { isAuth } from '../utils/utils';

export const emailRouter = express.Router();

emailRouter.post('/send-email-all', isAuth, async (req: Request, res: Response) => {
	const { subject, text, html } = req.body;

	try {
		// Find all users who are subscribed to the newsletter
		const users = await UserModel.find({ subscribedToNewsletter: true, isAdmin: false }).exec();

		// Send email to each user
		for (const user of users) {
			await sendEmail(user.email, subject, text, html);
		}

		res.send({ message: 'Email sent successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).send({ error: 'Failed to send email' });
	}
});
