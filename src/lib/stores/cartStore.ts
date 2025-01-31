import { writable } from 'svelte/store';

export interface CartItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	image: string;
}

function createCartStore() {
	const { subscribe, set, update } = writable<CartItem[]>([]);

	return {
		subscribe,
		addItem: (item: CartItem) =>
			update((items) => {
				const existingItem = items.find((i) => i.id === item.id);
				if (existingItem) {
					return items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
				}
				return [...items, { ...item, quantity: 1 }];
			}),
		removeItem: (id: number) => update((items) => items.filter((i) => i.id !== id)),
		updateQuantity: (id: number, quantity: number) =>
			update((items) => items.map((i) => (i.id === id ? { ...i, quantity } : i))),
		clearCart: () => set([])
	};
}

export const cart = createCartStore();
