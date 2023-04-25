export interface ProductListItemProps {
	name: string;
	href: string; //!TODO change href to to so it would redirect to store item.
	imageSrc: string;
	imageAlt: string;
	price: string;
	color: string;
}

export const ProductListData: ProductListItemProps[] = [
	{
		name: 'Nike Air VaporMax 2021 “Air Pressure”',
		href: '#',
		imageSrc: './images/air-pressure.jpeg',
		imageAlt: 'Side view of Nike Air VaporMax 2021 “Air Pressure”',
		price: '$210',
		color: 'White/Old Royal-Yellow Ochre',
	},
	{
		name: 'Nike Air VaporMax 2023 Flyknit “Baltic Blue”',
		href: '#',
		imageSrc: './images/baltic-blue.jpeg',
		imageAlt: 'Side view of Nike Air VaporMax 2023 Flyknit “Baltic Blue”',
		price: '$210',
		color: 'Baltic Blue/Citron Tint-Green Abyss',
	},
	{
		name: 'Nike Air VaporMax 2023 Flyknit',
		href: '#',
		imageSrc: './images/flyknit-black.jpeg',
		imageAlt: 'Side view of Nike Air VaporMax 2023 Flyknit',
		price: '$210',
		color: 'Black/Sail-Anthracite',
	},
	{
		name: 'Nike Air VaporMax 2023 Flyknit “Pure Platinum”',
		href: '#',
		imageSrc: './images/pure-platinum.jpeg',
		imageAlt: 'Side view of Nike Air VaporMax 2023 Flyknit “Pure Platinum”',
		price: '$210',
		color: 'Pure Platinum/White-Pure Platinum',
	},
	{
		name: 'Nike Air VaporMax 2021 “Air Pressure”',
		href: '#',
		imageSrc: './images/air-pressure.jpeg',
		imageAlt: 'Side view of Nike Air VaporMax 2021 “Air Pressure”',
		price: '$210',
		color: 'White/Old Royal-Yellow Ochre',
	},
	{
		name: 'Nike Air VaporMax 2023 Flyknit “Baltic Blue”',
		href: '#',
		imageSrc: './images/baltic-blue.jpeg',
		imageAlt: 'Side view of Nike Air VaporMax 2023 Flyknit “Baltic Blue”',
		price: '$210',
		color: 'Baltic Blue/Citron Tint-Green Abyss',
	},
];
