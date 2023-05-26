export interface ContactUs {
	_id: string;
	user?: {
		_id: string;
		name: string;
		email: string;
	};
	subject: string;
	customersMessage: string;
	replyMessage?: string;
	createdAt: string;
	isAnswered: boolean;
	answeredAt?: string;
}
