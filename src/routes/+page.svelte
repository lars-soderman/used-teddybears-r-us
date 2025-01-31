<script lang="ts">
	import type { Product } from '$lib/types';

	// Sample data for teddy bears
	const teddyBears: Product[] = [
		{
			id: 1,
			name: 'Vintage Brown Bear',
			price: 25.99,
			images: ['/teddy-placeholder.svg', '/teddy-placeholder-2.svg', '/teddy-placeholder-3.svg'],
			primaryImageIndex: 0,
			description: 'A classic vintage brown teddy bear.',
			features: ['Soft fur', 'Huggable'],
			reviews: [],
			relatedProducts: [],
			stock: 10,
			category: 'Vintage',
			tags: ['brown', 'vintage'],
			brand: 'TeddyLuxe'
		},
		{
			id: 2,
			name: 'Cuddly Panda',
			price: 29.99,
			images: ['/teddy-placeholder.svg', '/teddy-placeholder-2.svg', '/teddy-placeholder-3.svg'],
			primaryImageIndex: 1,
			description: 'An adorable panda bear plush.',
			features: ['Black and white fur', 'Extra cuddly'],
			reviews: [],
			relatedProducts: [],
			stock: 15,
			category: 'Exotic',
			tags: ['panda', 'black and white'],
			brand: 'PandaPals'
		},
		{
			id: 3,
			name: 'Classic Honey Bear',
			price: 19.99,
			images: ['/teddy-placeholder.svg', '/teddy-placeholder-2.svg', '/teddy-placeholder-3.svg'],
			primaryImageIndex: 2,
			description: 'A sweet honey-colored teddy bear.',
			features: ['Golden fur', 'Soft texture'],
			reviews: [],
			relatedProducts: [],
			stock: 20,
			category: 'Classic',
			tags: ['honey', 'golden'],
			brand: 'HoneyHugs'
		},
		{
			id: 4,
			name: 'Retro Polar Bear',
			price: 34.99,
			images: ['/teddy-placeholder.svg', '/teddy-placeholder-2.svg', '/teddy-placeholder-3.svg'],
			primaryImageIndex: 0,
			description: 'A cool retro-style polar bear plush.',
			features: ['White fur', 'Retro design'],
			reviews: [],
			relatedProducts: [],
			stock: 8,
			category: 'Retro',
			tags: ['polar', 'white'],
			brand: 'FrostyFriends'
		}
	];
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-6 text-3xl font-bold">Used Teddy Bears</h1>
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each teddyBears as bear}
			<a href="/product/{bear.id}" class="block">
				<div
					class="overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105"
				>
					<img
						src={bear.images[bear.primaryImageIndex] || '/placeholder.svg'}
						alt={bear.name}
						class="h-48 w-full object-cover"
					/>
					<div class="p-4">
						<h2 class="mb-2 text-xl font-semibold">{bear.name}</h2>
						<p class="text-gray-600">${bear.price.toFixed(2)}</p>
						<p class="mt-2 text-sm text-gray-500">In stock: {bear.stock}</p>
						<div class="mt-2">
							{#each bear.tags.slice(0, 2) as tag}
								<span
									class="mr-1 inline-block rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700"
								>
									#{tag}
								</span>
							{/each}
						</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style lang="postcss">
	:global(body) {
		@apply bg-gray-100;
	}
</style>
