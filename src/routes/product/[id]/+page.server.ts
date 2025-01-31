import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	// In a real application, you would fetch this data from your API or database
	return {
		id: params.id
	};
};
