export interface ProductListItemProps {
	name: string;
	slug: string;
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

export const ProductListData: ProductListItemProps[] = [
	{
		name: 'Nike Air VaporMax 2021 “Air Pressure”',
		slug: 'nike-vapormax-air-pressure',
		category: 'Sneakers',
		imageSrc: '/images/air-pressure.jpeg',
		imageAlt: 'Side view of Nike Air VaporMax 2021 “Air Pressure”',
		price: 210,
		countInStock: 0,
		brand: 'Nike',
		rating: 3.5,
		numberOfReviews: 10,
		description:
			'The Nike Air VaporMax 2021 "Air Pressure" is a sleek and stylish sneaker that\'s designed for comfort and performance. This shoe features a futuristic look that\'s sure to turn heads, with its Yellow and white color scheme and unique, textured design.',
		color: 'White/Old Royal-Yellow Ochre',
	},
	{
		name: 'Nike Air VaporMax 2023 Flyknit “Baltic Blue”',
		slug: 'nike-vapormax-baltic-blue',
		category: 'Sneakers',
		imageSrc: '/images/baltic-blue.jpeg',
		imageAlt: 'Side view of Nike Air VaporMax 2023 Flyknit “Baltic Blue”',
		price: 210,
		countInStock: 10,
		brand: 'Nike',
		rating: 4.5,
		numberOfReviews: 10,
		description: 'High quality sneakers',
		color: 'Baltic Blue/Citron Tint-Green Abyss',
	},
	{
		name: 'Nike Air VaporMax 2023 Flyknit',
		slug: 'nike-vapormax-flyknit-black',
		category: 'Sneakers',
		imageSrc: '/images/flyknit-black.jpeg',
		imageAlt: 'Side view of Nike Air VaporMax 2023 Flyknit',
		price: 210,
		countInStock: 10,
		brand: 'Nike',
		rating: 4.5,
		numberOfReviews: 10,
		description: 'High quality sneakers',
		color: 'Black/Sail-Anthracite',
	},
	{
		name: 'Nike Air VaporMax 2023 Flyknit “Pure Platinum”',
		slug: 'nike-vapormax-pure-platinum',
		category: 'Sneakers',
		imageSrc: '/images/pure-platinum.jpeg',
		imageAlt: 'Side view of Nike Air VaporMax 2023 Flyknit “Pure Platinum”',
		price: 210,
		countInStock: 10,
		brand: 'Nike',
		rating: 4.5,
		numberOfReviews: 10,
		description: 'High quality sneakers',
		color: 'Pure Platinum/White-Pure Platinum',
	},
];
