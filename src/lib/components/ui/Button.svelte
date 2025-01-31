<script lang="ts">
    export let variant: 'default' | 'outline' | 'ghost' = 'default';
    export let size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
    export let type: 'button' | 'submit' | 'reset' = 'button';
  
    let className: string;
    $: {
      const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
      const variantClasses = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground'
      };
      const sizeClasses = {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10'
      };
      className = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
    }
  </script>
  
  <button type={type} class={className} on:click {...$$restProps}>
    <slot />
  </button>
  
  