<script lang="ts">
    export let type: string = 'text';
    export let value: string | number = '';
    export let placeholder: string = '';
  
    let className: string;
    $: {
      className = 'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
    }
  </script>
  
  <input
    {type}
    class={className}
    {placeholder}
    bind:value
    on:input
    on:change
    {...$$restProps}
  />
  
  