<script lang="ts">
	// Small UI glyphs, 24px grid, 1.5 stroke, square caps — drawn to match the chamfered world.
	type Name = 'arrow' | 'arrow-left' | 'plus' | 'minus' | 'phone' | 'menu' | 'close' | 'pin' | 'mail' | 'sms';

	let { name, size = 20, class: className = '' }: { name: Name; size?: number; class?: string } = $props();
</script>

<svg
	class={className}
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.6"
	stroke-linecap="square"
	stroke-linejoin="miter"
	aria-hidden="true"
>
	{#if name === 'arrow'}
		<path d="M4 12h15M13 6l6 6-6 6" />
	{:else if name === 'arrow-left'}
		<path d="M20 12H5M11 6l-6 6 6 6" />
	{:else if name === 'plus'}
		<path d="M12 5v14M5 12h14" />
	{:else if name === 'minus'}
		<path d="M5 12h14" />
	{:else if name === 'phone'}
		<path d="M8 3H5L3.5 4.5c0 9 7 16 16 16L21 19v-3l-4-1.5-2 2c-2.5-1-5-3.5-6-6l2-2L9.5 4.5Z" />
	{:else if name === 'menu'}
		<path d="M3 9h18M3 15h18" />
	{:else if name === 'close'}
		<path d="M6 6l12 12M18 6 6 18" />
	{:else if name === 'pin'}
		<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Z" /><path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
	{:else if name === 'mail'}
		<path d="M3 5.5h18v13H3z" /><path d="m3 6 9 7 9-7" />
	{:else if name === 'sms'}
		<path d="M3 4.5h18v12H10l-5 4v-4H3z" /><path d="M7.5 10.5h9" />
	{/if}
</svg>
