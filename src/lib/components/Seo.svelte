<script lang="ts">
	let { title, description }: { title: string; description: string } = $props();

	const fullTitle = $derived(
		title ? `${title} · SAS Construction Cebu` : 'SAS Construction · Builders & Equipment Rental in Cebu'
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/brand/sas-sign-mockup.jpg" />
</svelte:head>
