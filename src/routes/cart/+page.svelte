<script lang="ts">
	import { cart } from '$lib/stores/cartStore';
	import { Trash2, Plus, Minus } from 'lucide-svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	let cartItems: any[];

	cart.subscribe((value) => {
		cartItems = value;
	});

	function removeItem(id: number) {
		cart.removeItem(id);
	}

	function updateQuantity(id: number, newQuantity: number) {
		if (newQuantity > 0) {
			cart.updateQuantity(id, newQuantity);
		} else {
			removeItem(id);
		}
	}

	$: total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-8 text-3xl font-bold">Your Shopping Cart</h1>

	{#if cartItems.length === 0}
		<p class="text-xl text-gray-600">Your cart is empty.</p>
	{:else}
		<div class="grid gap-8">
			{#each cartItems as item, index (item.id)}
				<div class="flex items-center border-b pb-4">
					<img
						src={item.image || `/teddy-placeholder-${(index % 3) + 1}.svg`}
						alt={item.name}
						class="mr-4 h-24 w-24 rounded-md object-cover"
					/>
					<div class="flex-grow">
						<h2 class="text-xl font-semibold">{item.name}</h2>
						<p class="text-gray-600">${item.price.toFixed(2)}</p>
					</div>
					<div class="flex items-center">
						<Button
							variant="outline"
							size="icon"
							on:click={() => updateQuantity(item.id, item.quantity - 1)}
						>
							<Minus class="h-4 w-4" />
						</Button>
						<Input
							type="number"
							min="1"
							class="mx-2 w-16 text-center"
							value={item.quantity}
							on:input={(e) => updateQuantity(item.id, parseInt(e.currentTarget.value))}
						/>
						<Button
							variant="outline"
							size="icon"
							on:click={() => updateQuantity(item.id, item.quantity + 1)}
						>
							<Plus class="h-4 w-4" />
						</Button>
					</div>
					<p class="ml-4 w-24 text-right text-xl font-semibold">
						${(item.price * item.quantity).toFixed(2)}
					</p>
					<Button variant="ghost" size="icon" class="ml-4" on:click={() => removeItem(item.id)}>
						<Trash2 class="h-5 w-5 text-red-500" />
					</Button>
				</div>
			{/each}
		</div>

		<div class="mt-8 flex items-center justify-between">
			<p class="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
			<Button>Proceed to Checkout</Button>
		</div>
	{/if}
</div>
