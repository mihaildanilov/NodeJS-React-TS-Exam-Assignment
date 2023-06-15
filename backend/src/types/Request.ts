/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Express {
	export interface Request {
		user: {
			_id: string;
			name: string;
			email: string;
			isAdmin: boolean;
			token: string;
		};
		body: {
			name: string;
			slug: string;
			image: string;
			imageAlt: string;
			price: number;
			brand: string;
			category: string;
			description: string;
			countInStock: number;
			rating: number;
			numberOfReviews: number;
			color: string;
		} & Record<string, unknown>;
	}
}
