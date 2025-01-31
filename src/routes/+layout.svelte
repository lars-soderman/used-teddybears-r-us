<script lang="ts">
	import '../app.css';
	import TopNav from '$lib/components/TopNav.svelte';
  </script>
  
  <TopNav />
  
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<slot />
  </main>
  
  <footer class="bg-gray-100 mt-12">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	  <p class="text-center text-gray-500">© 2023 Used Teddybears R Us. All rights reserved.</p>
	</div>
  </footer>
  
  