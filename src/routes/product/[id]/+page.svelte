<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import StarRating from './StarRating.svelte';
	import type { Product } from '$lib/types';
	import { ShoppingCart } from 'lucide-svelte';
  
	export let data: { id: string };
  
	let cartItems: { [key: number]: number } = {};
	let cartTotal = 0;
	let currentImageIndex = 0;
  
	async function fetchProduct(id: string): Promise<Product> {
	  // Simulate API call
	  await new Promise(resolve => setTimeout(resolve, 1000));
	  return {
		id: parseInt(id),
		name: 'Vintage Brown Bear',
		price: 25.99,
		description: 'This charming vintage brown bear is the perfect companion for cuddles and adventures. With its soft fur and endearing expression, it\'s sure to become a treasured member of any family.',
		images: ['/teddy-placeholder.svg', '/teddy-placeholder-2.svg', '/teddy-placeholder-3.svg'],
		primaryImageIndex: 1,
		features: ['Made from high-quality, soft materials', 'Suitable for all ages', 'Hand-washable', 'Certified safe for children'],
		reviews: [
		  { user: 'Happy Parent', rating: 5, comment: 'My child loves this bear! It\'s so soft and cuddly.' },
		  { user: 'Collector', rating: 4, comment: 'Great addition to my vintage teddy collection.' },
		],
		relatedProducts: [
		  { id: 2, name: 'Cuddly Panda', price: 29.99, image: '/teddy-placeholder.svg' },
		  { id: 3, name: 'Classic Honey Bear', price: 19.99, image: '/teddy-placeholder.svg' },
		],
		stock: 10,
		category: 'Vintage',
		tags: ['brown', 'vintage', 'soft'],
		brand: 'TeddyLuxe',
		material: 'Cotton and polyester blend'
	  };
	}
  
	function nextImage(product: Product) {
	  currentImageIndex = (currentImageIndex + 1) % product.images.length;
	}
  
	function prevImage(product: Product) {
	  currentImageIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
	}
  
	function addToCart(product: Product) {
	  if (cartItems[product.id]) {
		cartItems[product.id]++;
	  } else {
		cartItems[product.id] = 1;
	  }
	  cartItems = cartItems; // Trigger reactivity
	  updateCartTotal(product);
	}
  
	function updateCartTotal(product: Product) {
	  cartTotal = Object.entries(cartItems).reduce((total, [id, quantity]) => {
		return total + product.price * quantity;
	  }, 0);
	}
  
	const productPromise = fetchProduct(data.id);
  </script>
  
  {#await productPromise}
	<div class="flex justify-center items-center h-screen">
	  <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
	</div>
  {:then product}
	<div class="container mx-auto px-4 py-8">
	  <div class="grid md:grid-cols-2 gap-8">
		<!-- Image Gallery -->
		<div class="relative">
		  {#each product.images as image, index}
			{#if index === currentImageIndex}
			  <img 
				in:fly="{{ x: 50, duration: 300 }}"
				out:fly="{{ x: -50, duration: 300 }}"
				src={image || "/placeholder.svg"} 
				alt={`${product.name} - Image ${index + 1}`}
				class="w-full h-96 object-cover rounded-lg shadow-lg"
			  />
			{/if}
		  {/each}
		  <button on:click={() => prevImage(product)} class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
			←
		  </button>
		  <button on:click={() => nextImage(product)} class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
			→
		  </button>
		</div>
  
		<!-- Product Details -->
		<div>
		  <h1 class="text-3xl font-bold mb-4">{product.name}</h1>
		  <p class="text-2xl text-blue-600 mb-4">${product.price.toFixed(2)}</p>
		  <p class="mb-4">{product.description}</p>
		  <p class="mb-2"><strong>Brand:</strong> {product.brand}</p>
		  <p class="mb-2"><strong>Category:</strong> {product.category}</p>
		  <p class="mb-2"><strong>Material:</strong> {product.material}</p>
		  <p class="mb-4"><strong>In Stock:</strong> {product.stock}</p>
		  <h2 class="text-xl font-semibold mb-2">Features:</h2>
		  <ul class="list-disc pl-5 mb-4">
			{#each product.features as feature}
			  <li>{feature}</li>
			{/each}
		  </ul>
		  <div class="mb-4">
			{#each product.tags as tag}
			  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tag}</span>
			{/each}
		  </div>
		  <button 
			on:click={() => addToCart(product)}
			class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors flex items-center"
		  >
			<ShoppingCart class="mr-2" />
			Add to Cart
		  </button>
		  
		  {#if cartItems[product.id]}
			<p class="mt-4 text-green-600">
			  {cartItems[product.id]} in cart
			</p>
		  {/if}
		</div>
	  </div>
  
	  <!-- Cart Summary -->
	  {#if Object.keys(cartItems).length > 0}
		<div class="mt-8 p-4 bg-gray-100 rounded-lg">
		  <h2 class="text-xl font-bold mb-2">Cart Summary</h2>
		  <p>Total Items: {Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0)}</p>
		  <p>Total Price: ${cartTotal.toFixed(2)}</p>
		</div>
	  {/if}
  
	  <!-- Reviews -->
	  <div class="mt-12">
		<h2 class="text-2xl font-bold mb-4">Customer Reviews</h2>
		{#each product.reviews as review}
		  <div class="bg-gray-100 p-4 rounded-lg mb-4" transition:fade>
			<div class="flex items-center mb-2">
			  <StarRating rating={review.rating} />
			  <span class="ml-2 font-semibold">{review.user}</span>
			</div>
			<p>{review.comment}</p>
		  </div>
		{/each}
	  </div>
  
	  <!-- Related Products -->
	  <div class="mt-12">
		<h2 class="text-2xl font-bold mb-4">Related Products</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
		  {#each product.relatedProducts as relatedProduct}
			<div class="bg-white rounded-lg shadow-md overflow-hidden">
			  <img src={relatedProduct.image || "/placeholder.svg"} alt={relatedProduct.name} class="w-full h-48 object-cover" />
			  <div class="p-4">
				<h3 class="text-lg font-semibold mb-2">{relatedProduct.name}</h3>
				<p class="text-gray-600">${relatedProduct.price.toFixed(2)}</p>
				<a href="/product/{relatedProduct.id}" class="mt-2 inline-block text-blue-500 hover:underline">
				  View Details
				</a>
			  </div>
			</div>
		  {/each}
		</div>
	  </div>
	</div>
  {:catch error}
	<div class="container mx-auto px-4 py-8">
	  <p class="text-xl text-red-500">Error loading product: {error.message}</p>
	</div>
  {/await}
  
  