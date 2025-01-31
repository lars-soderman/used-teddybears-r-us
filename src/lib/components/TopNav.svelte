<script lang="ts">
  import { page } from '$app/stores';
  import { ShoppingCart, Menu, X } from 'lucide-svelte';
  import { fly } from 'svelte/transition';
  import { cart } from '$lib/stores/cartStore';

  let isMenuOpen = false;
  let cartItemCount = 0;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  $: path = $page.url.pathname;

  cart.subscribe(items => {
    cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  });
</script>

<nav class="bg-white shadow-md">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <a href="/" class="text-xl font-bold text-blue-500">Teddybears R Us</a>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
          <a href="/" class={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${path === '/' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
            Home
          </a>
          <a href="/products" class={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${path.startsWith('/products') ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
            Products
          </a>
          <a href="/about" class={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${path === '/about' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
            About
          </a>
          <a href="/contact" class={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${path === '/contact' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
            Contact
          </a>
        </div>
      </div>
      <div class="hidden sm:ml-6 sm:flex sm:items-center">
        <a href="/cart" class="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative">
          <span class="sr-only">View cart</span>
          <ShoppingCart class="h-6 w-6" />
          {#if cartItemCount > 0}
            <span class="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{cartItemCount}</span>
          {/if}
        </a>
      </div>
      <div class="-mr-2 flex items-center sm:hidden">
        <button on:click={toggleMenu} type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" aria-controls="mobile-menu" aria-expanded={isMenuOpen}>
          <span class="sr-only">Open main menu</span>
          {#if isMenuOpen}
            <X class="block h-6 w-6" />
          {:else}
            <Menu class="block h-6 w-6" />
          {/if}
        </button>
      </div>
    </div>
  </div>

  {#if isMenuOpen}
    <div class="sm:hidden" id="mobile-menu" transition:fly="{{ y: -100, duration: 300 }}">
      <div class="pt-2 pb-3 space-y-1">
        <a href="/" class={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${path === '/' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'}`}>
          Home
        </a>
        <a href="/products" class={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${path.startsWith('/products') ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'}`}>
          Products
        </a>
        <a href="/about" class={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${path === '/about' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'}`}>
          About
        </a>
        <a href="/contact" class={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${path === '/contact' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'}`}>
          Contact
        </a>
        <a href="/cart" class={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${path === '/cart' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'}`}>
          Cart ({cartItemCount})
        </a>
      </div>
    </div>
  {/if}
</nav>

