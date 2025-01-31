export type Review = {
	user: string;
	rating: number;
	comment: string;
};

export type RelatedProduct = {
	id: number;
	name: string;
	price: number;
	image: string;
};

export type Product = {
	id: number;
	name: string;
	price: number;
	description: string;
	images: string[];
	primaryImageIndex: number;
	features: string[];
	reviews: Review[];
	stock: number;
	category: string;
	tags: string[];
	brand: string;
	material: string;
};
