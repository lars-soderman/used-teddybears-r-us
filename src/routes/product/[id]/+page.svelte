<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import StarRating from './StarRating.svelte';
	import type { Product } from '$lib/types';
	import { ShoppingCart } from 'lucide-svelte';
	import { cart } from '$lib/stores/cartStore';
	import { getRelatedProducts } from '$lib/utils/productUtils';

	export let data: { product: Product };

	$: product = data.product;
	$: relatedProducts = getRelatedProducts(product.id);
	$: currentImageIndex = product.primaryImageIndex;

	function nextImage() {
		currentImageIndex = (currentImageIndex + 1) % product.images.length;
	}

	function prevImage() {
		currentImageIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
	}

	function addToCart() {
		cart.addItem({
			id: product.id,
			name: product.name,
			price: product.price,
			quantity: 1,
			image: product.images[product.primaryImageIndex]
		});
	}
</script>

<div class="container mx-auto px-4 py-8">
	<div class="grid gap-8 md:grid-cols-2">
		<!-- Image Gallery -->
		<div class="relative">
			{#each product.images as image, index}
				{#if index === currentImageIndex}
					<img
						in:fly={{ x: 50, duration: 300 }}
						out:fly={{ x: -50, duration: 300 }}
						src={image || '/placeholder.svg'}
						alt={`${product.name} - Image ${index + 1}`}
						class="h-96 w-full rounded-lg object-cover shadow-lg"
					/>
				{/if}
			{/each}
			<button
				on:click={prevImage}
				class="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md"
			>
				←
			</button>
			<button
				on:click={nextImage}
				class="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md"
			>
				→
			</button>
		</div>

		<!-- Product Details -->
		<div>
			<h1 class="mb-4 text-3xl font-bold">{product.name}</h1>
			<p class="mb-4 text-2xl text-blue-600">${product.price.toFixed(2)}</p>
			<p class="mb-4">{product.description}</p>
			<p class="mb-2"><strong>Brand:</strong> {product.brand}</p>
			<p class="mb-2"><strong>Category:</strong> {product.category}</p>
			<p class="mb-2"><strong>Material:</strong> {product.material}</p>
			<p class="mb-4"><strong>In Stock:</strong> {product.stock}</p>
			<h2 class="mb-2 text-xl font-semibold">Features:</h2>
			<ul class="mb-4 list-disc pl-5">
				{#each product.features as feature}
					<li>{feature}</li>
				{/each}
			</ul>
			<div class="mb-4">
				{#each product.tags as tag}
					<span
						class="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
					>
						#{tag}
					</span>
				{/each}
			</div>
			<button
				on:click={addToCart}
				class="flex items-center rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
			>
				<ShoppingCart class="mr-2" />
				Add to Cart
			</button>
		</div>
	</div>

	<!-- Reviews -->
	<div class="mt-12">
		<h2 class="mb-4 text-2xl font-bold">Customer Reviews</h2>
		{#each product.reviews as review}
			<div class="mb-4 rounded-lg bg-gray-100 p-4" transition:fade>
				<div class="mb-2 flex items-center">
					<StarRating rating={review.rating} />
					<span class="ml-2 font-semibold">{review.user}</span>
				</div>
				<p>{review.comment}</p>
			</div>
		{/each}
	</div>

	<!-- Related Products -->
	<div class="mt-12">
		<h2 class="mb-4 text-2xl font-bold">Related Products</h2>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
			{#each relatedProducts as relatedProduct}
				<div class="overflow-hidden rounded-lg bg-white shadow-md">
					<img
						src={relatedProduct.images[relatedProduct.primaryImageIndex] || '/placeholder.svg'}
						alt={relatedProduct.name}
						class="h-48 w-full object-cover"
					/>
					<div class="p-4">
						<h3 class="mb-2 text-lg font-semibold">{relatedProduct.name}</h3>
						<p class="text-gray-600">${relatedProduct.price.toFixed(2)}</p>
						<a
							href="/product/{relatedProduct.id}"
							class="mt-2 inline-block text-blue-500 hover:underline"
						>
							View Details
						</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
