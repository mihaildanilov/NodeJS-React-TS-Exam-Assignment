import { Router, Request, Response } from 'express';
import { ContactUsModel, ContactUs } from '../models/ContactUsModel';
import { isAuth } from '../utils/utils';
import asyncHandler from 'express-async-handler';

export const contactUsRouter = Router();

// POST /api/contact-us
contactUsRouter.post('/', isAuth, async (req: Request, res: Response) => {
	const { subject, customersMessage } = req.body;
	try {
		const contactUs = new ContactUsModel({
			subject,
			customersMessage,
			user: req.user._id,
		} as ContactUs);

		const savedContactUs = await contactUs.save();
		res.status(201).json(savedContactUs);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
});

contactUsRouter.put('/message/:id', isAuth, async (req: Request, res: Response) => {
	const { id } = req.params;
	const { replyMessage, isAnswered } = req.body;
	try {
		const contactUs = await ContactUsModel.findById(id);

		if (!contactUs) {
			res.status(404).json({ message: 'Contact us message not found' });
			return;
		}

		if (!req.user.isAdmin && (!contactUs.user || contactUs.user.toString() !== req.user._id)) {
			res.status(403).json({ message: 'Forbidden' });
			return;
		}

		contactUs.replyMessage = replyMessage;
		contactUs.isAnswered = isAnswered;
		contactUs.answeredAt = new Date();

		const updatedContactUs = await contactUs.save();
		res.status(200).json(updatedContactUs);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
});

contactUsRouter.get('/all-messages', isAuth, async (req: Request, res: Response) => {
	try {
		const contactUsMessages: ContactUs[] = await ContactUsModel.find().populate('user');
		res.status(200).json(contactUsMessages);
	} catch (error) {
		res.status(500).json({ message: 'Failed to retrieve contact us messages', error });
	}
});

contactUsRouter.get('/message/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const contactUs: ContactUs | null = await ContactUsModel.findById(id).populate('user');
		return res.status(200).json(contactUs);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Failed to retrieve contact us message', error });
	}
});

contactUsRouter.get(
	'/user-messages',
	isAuth,
	asyncHandler(async (req: Request, res: Response) => {
		const orders = await ContactUsModel.find({ user: req.user._id });
		res.json(orders);
	})
);
