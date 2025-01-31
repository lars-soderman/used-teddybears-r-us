import type { PageServerLoad } from './$types';
import { getProductById } from '$lib/utils/productUtils';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const product = getProductById(parseInt(params.id));

	if (!product) {
		throw error(404, 'Product not found');
	}

	return {
		product
	};
};
