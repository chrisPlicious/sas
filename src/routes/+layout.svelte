<script lang="ts">
	import '@fontsource/chakra-petch/latin-400.css';
	import '@fontsource/chakra-petch/latin-500.css';
	import '@fontsource/chakra-petch/latin-600.css';
	import '@fontsource/chakra-petch/latin-700.css';
	import '@fontsource-variable/azeret-mono/wght.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { startReveals } from '$lib/motion/reveal';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import EntryLoader from '$lib/components/EntryLoader.svelte';

	let { children } = $props();

	onMount(startReveals);

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<meta name="theme-color" content="#f7890c" />
</svelte:head>

<EntryLoader />

<a class="skip" href="#main">Skip to content</a>

<Header />

<main id="main" tabindex="-1">
	{@render children()}
</main>

<Footer />

<style>
	.skip {
		position: absolute;
		left: var(--gutter);
		top: 0.5rem;
		z-index: 100;
		padding: 0.6rem 1rem;
		background: var(--ink);
		color: var(--paper);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		translate: 0 -200%;
	}

	.skip:focus {
		translate: 0 0;
	}

	main {
		display: block;
		position: relative;
	}

	main:focus {
		outline: none;
	}
</style>
