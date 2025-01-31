<script lang="ts">
	import type { Product } from '$lib/types';
	import { getAllProducts } from '$lib/utils/productUtils';

	const teddyBears: Product[] = getAllProducts();
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
