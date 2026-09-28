<script lang="ts">
	import type { Equipment } from '$lib/content/equipment';
	import Photo from './Photo.svelte';
	import Icon from './Icon.svelte';

	let { item }: { item: Equipment } = $props();
</script>

<article class="eq">
	<div class="eq-media">
		<Photo photo={item.photo} sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 45vw, 92vw" />
		<div class="eq-tags">
			<span class="tag">{item.category}</span>
			{#if item.sample}
				<span class="tag tag-sample">Sample listing</span>
			{:else if item.stockPhoto}
				<span class="tag tag-sample">Sample photo</span>
			{/if}
		</div>
		{#if item.photo.credit}
			{@const c = item.photo.credit}
			<a class="eq-credit mono" href={c.href} target="_blank" rel="noopener">Photo: {c.author} · {c.license}</a>
		{/if}
	</div>
	<div class="eq-body">
		<h3 class="eq-name">{item.name}</h3>
		<ul class="eq-specs mono" role="list">
			{#each item.specs as spec (spec)}
				<li>{spec}</li>
			{/each}
		</ul>
		<a class="btn btn-sm eq-cta" href="/contact?type=rent&item={encodeURIComponent(item.name)}">
			<span>Ask availability</span>
			<Icon name="arrow" size={16} class="arrow" />
		</a>
	</div>
</article>

<style>
	.eq {
		display: grid;
		grid-template-rows: auto 1fr;
		height: 100%;
		background: var(--ink-2);
		color: var(--paper);
		clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px));
	}

	.eq-media {
		position: relative;
		aspect-ratio: 4 / 3;
		overflow: hidden;
	}

	.eq-media :global(.photo) {
		transition: scale 900ms var(--ease-out);
	}

	.eq:hover .eq-media :global(.photo) {
		scale: 1.04;
	}

	.eq-tags {
		position: absolute;
		top: 0.75rem;
		left: 0.75rem;
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}

	.eq-credit {
		position: absolute;
		right: 0;
		bottom: 0;
		max-width: 85%;
		padding: 0.2rem 0.45rem;
		background: rgb(28 27 25 / 0.72);
		color: var(--paper);
		font-size: 0.625rem;
		line-height: 1.35;
		text-align: right;
		text-decoration: none;
	}

	.eq-credit:hover {
		text-decoration: underline;
	}

	.eq-credit:focus-visible {
		outline-color: var(--paper);
		outline-offset: -3px;
	}

	.eq-body {
		display: grid;
		align-content: start;
		gap: 0.9rem;
		padding: 1.1rem 1.1rem 1.4rem;
	}

	.eq-name {
		font-size: 1.35rem;
		font-weight: 500;
		line-height: 1.05;
		text-transform: uppercase;
	}

	.eq-specs {
		margin: 0;
		border-top: 1px solid var(--line-dark);
		color: var(--steel-on-dark);
	}

	.eq-specs li {
		padding: 0.45rem 0;
		border-bottom: 1px solid var(--line-dark);
	}

	.eq-cta {
		justify-self: start;
		margin-top: 0.4rem;
	}

	.eq-cta:focus-visible {
		outline-color: var(--paper);
	}
</style>
