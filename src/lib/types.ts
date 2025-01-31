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
	relatedProducts: RelatedProduct[];
	stock: number;
	category: string;
	tags: string[];
	brand: string;
	dimensions?: {
		height: number;
		width: number;
		depth: number;
	};
	weight?: number;
	ageRecommendation?: string;
	material?: string;
};
