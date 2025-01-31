import type { Product } from '$lib/types';
import productData from '$lib/data/products.json';

export function getAllProducts(): Product[] {
	return productData.products;
}

export function getProductById(id: number): Product | undefined {
	return productData.products.find((product) => product.id === id);
}

export function getRelatedProducts(currentProductId: number, limit: number = 3): Product[] {
	const products = productData.products.filter((product) => product.id !== currentProductId);
	return products.slice(0, limit);
}
