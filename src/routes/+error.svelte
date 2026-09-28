<script lang="ts">
	import { page } from '$app/state';
	import Icon from '$lib/components/Icon.svelte';
	import LogoMark from '$lib/components/LogoMark.svelte';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Page not found' : 'Something went wrong'} · SAS Construction Cebu</title>
</svelte:head>

<section class="err frame">
	<LogoMark class="err-mark" />
	<p class="mono err-code">Error {page.status}</p>
	<h1 class="display h2">
		{page.status === 404 ? 'Nothing built on this lot yet.' : 'Something broke on our end.'}
	</h1>
	<p class="lead muted">
		{page.status === 404
			? 'The page you were looking for is not here. Try the home page, or call us directly.'
			: 'Try again in a moment, or call us directly.'}
	</p>
	<div class="err-actions">
		<a class="btn btn-ink" href="/"><span>Back to home</span><Icon name="arrow" class="arrow" /></a>
		<a class="btn" href="/contact"><span>Contact SAS</span><Icon name="arrow" class="arrow" /></a>
	</div>
</section>

<style>
	.err {
		display: grid;
		justify-items: start;
		gap: 1.25rem;
		padding-block: 10rem var(--section);
	}

	.err :global(.err-mark) {
		width: 6rem;
	}

	.err-code {
		color: var(--steel);
	}

	.err .h2 {
		max-width: 14ch;
	}

	.err-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
</style>
