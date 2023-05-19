import sgMail from '@sendgrid/mail';

export async function sendEmail(to: string, subject: string, text: string, html: string) {
	const apiKey = process.env.SENDGRID_API_KEY;
	if (!apiKey) {
		console.error('SENDGRID_API_KEY environment variable is not set');
		return;
	}

	sgMail.setApiKey(apiKey);
	const msg = {
		to,
		from: 'kicksavenue.contact@gmail.com',
		subject,
		text,
		html,
	};
	try {
		await sgMail.send(msg);
		console.log('Email sent');
	} catch (error) {
		console.error(error);
	}
}
