interface ProductInterface {
	name: string;
	slug: string;
	imageSrc: string; // Note: Aligned with schema property name
	imageAlt: string;
	price: number;
	brand: string;
	category: string;
	description: string;
	countInStock: number;
	rating: number;
	numberOfReviews: number;
	color: string;
}
