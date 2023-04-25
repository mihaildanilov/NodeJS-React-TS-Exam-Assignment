export interface ProductListItemProps {
	name: string;
	slug: string;
	href: string; //!TODO change href to to so it would redirect to store item.
	category: string;
	brand: string;
	imageSrc: string;
	imageAlt: string;
	price: number;
	color: string;
	countInStock: number;
	description: string;
	rating: number;
	numberOfReviews: number;
}
