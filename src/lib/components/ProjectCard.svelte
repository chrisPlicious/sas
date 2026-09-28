<script lang="ts">
	import type { Project } from '$lib/content/projects';
	import Photo from './Photo.svelte';
	import Icon from './Icon.svelte';

	let { project, sizes = '(min-width: 64rem) 40vw, 85vw' }: { project: Project; sizes?: string } = $props();
</script>

<article class="card">
	<div class="media">
		<Photo photo={project.photo} {sizes} />
		<div class="tags">
			<span class="tag">{project.category}</span>
			{#if project.sample}
				<span class="tag tag-sample">Sample photo</span>
			{/if}
		</div>
	</div>
	<div class="plate">
		<h3 class="title">{project.title}</h3>
		<p class="mono loc">{project.location}</p>
	</div>
	<a class="more" href="/contact?type=build&project={encodeURIComponent(project.title)}">
		<Icon name="plus" size={18} />
		<span class="visually-hidden">Ask about a project like {project.title}</span>
	</a>
</article>

<style>
	.card {
		position: relative;
		display: grid;
		background: var(--ink);
		isolation: isolate;
	}

	.media {
		position: relative;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		grid-area: 1 / 1;
	}

	/* ground shade so the paper title plate never dissolves into a white sky */
	.media::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgb(28 27 25 / 0.5), rgb(28 27 25 / 0) 45%);
		pointer-events: none;
	}

	.media :global(.photo) {
		transition:
			filter 600ms var(--ease-out),
			scale 900ms var(--ease-out);
	}

	.card:hover .media :global(.photo) {
		filter: grayscale(0.15) contrast(1.04);
		scale: 1.03;
	}

	.tags {
		position: absolute;
		z-index: 1;
		top: 0.75rem;
		left: 0.75rem;
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}

	/* Title plate: paper, right edge cut at the roof pitch */
	.plate {
		grid-area: 1 / 1;
		align-self: end;
		justify-self: start;
		width: min(88%, 26rem);
		padding: 0.8rem 3.25rem 0.75rem 0.9rem;
		background: var(--paper);
		clip-path: polygon(0 0, calc(100% - 2.4rem) 0, 100% 100%, 0 100%);
	}

	.title {
		font-size: clamp(1rem, 0.9rem + 0.45vw, 1.25rem);
		font-weight: 500;
		line-height: 1.1;
		text-transform: uppercase;
	}

	.loc {
		margin-top: 0.3rem;
		color: var(--steel);
	}

	.more {
		position: absolute;
		right: 0.75rem;
		bottom: 0.75rem;
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		background: var(--orange);
		color: var(--ink);
		transition: background-color 180ms var(--ease-out);
	}

	.more:hover {
		background: var(--paper);
	}

	.more:focus-visible {
		outline: 2px solid var(--paper);
		outline-offset: 2px;
	}
</style>
