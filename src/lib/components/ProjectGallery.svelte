<script lang="ts">
	import type { Project } from '$lib/content/projects';
	import Photo from './Photo.svelte';
	import Icon from './Icon.svelte';

	let { project }: { project: Project } = $props();

	const shots = $derived(project.gallery ?? [project.photo]);
	const titleId = $derived(`${project.slug}-viewer-title`);

	let dialog: HTMLDialogElement | undefined;
	let track: HTMLElement | undefined;
	let index = $state(0);
	// Slide a smooth scroll is heading to, so repeated clicks keep stepping
	let target = 0;
	let settle: ReturnType<typeof setTimeout> | undefined;

	const registerDialog = (node: HTMLDialogElement) => {
		dialog = node;
		return () => (dialog = undefined);
	};

	const registerTrack = (node: HTMLElement) => {
		track = node;
		return () => (track = undefined);
	};

	const pad = (n: number) => String(n).padStart(2, '0');

	export function show(start = 0) {
		if (!dialog || !track) return;
		dialog.showModal();
		index = target = start;
		track.scrollTo({ left: start * track.clientWidth, behavior: 'instant' });
	}

	function go(dir: 1 | -1) {
		if (!track) return;
		target = Math.min(shots.length - 1, Math.max(0, target + dir));
		track.scrollTo({ left: target * track.clientWidth, behavior: 'smooth' });
	}

	function onscroll() {
		if (!track) return;
		index = Math.round(track.scrollLeft / track.clientWidth);
		// once scrolling stops (arrows or a swipe), step on from where it landed
		clearTimeout(settle);
		settle = setTimeout(() => (target = index), 150);
	}

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
			e.preventDefault();
			go(e.key === 'ArrowRight' ? 1 : -1);
		}
	}
</script>

<!-- Real SAS photos, shown one at a time and in colour so clients see the actual finishes -->
<dialog class="viewer" {@attach registerDialog} aria-labelledby={titleId} {onkeydown}>
	<div class="bar">
		<div>
			<h2 id={titleId} class="title">{project.title}</h2>
			<p class="mono loc">{project.location}</p>
		</div>
		<button class="btn btn-paper btn-sm" type="button" onclick={() => dialog?.close()}>
			<span>Close</span>
			<Icon name="close" size={18} />
		</button>
	</div>

	<ul class="track" role="list" aria-label="Photos" {@attach registerTrack} {onscroll}>
		{#each shots as shot, i (shot.id)}
			<li class="slide" aria-label="{i + 1} of {shots.length}">
				<Photo photo={{ ...shot, color: true }} sizes="100vw" />
			</li>
		{/each}
	</ul>

	<div class="foot">
		<p class="caption">{shots[index]?.alt}</p>
		<div class="controls">
			<span class="mono count" aria-live="polite">{pad(index + 1)} / {pad(shots.length)}</span>
			<button
				class="arrow-btn"
				type="button"
				onclick={() => go(-1)}
				aria-disabled={index === 0}
				aria-label="Previous photo"
			>
				<Icon name="arrow-left" size={18} />
			</button>
			<button
				class="arrow-btn"
				type="button"
				onclick={() => go(1)}
				aria-disabled={index === shots.length - 1}
				aria-label="Next photo"
			>
				<Icon name="arrow" size={18} />
			</button>
		</div>
		{#if project.note || project.source}
			<p class="mono meta">
				{#if project.note}<span>{project.note}</span>{/if}
				{#if project.source}
					<a href={project.source} target="_blank" rel="noopener">View the post on Facebook</a>
				{/if}
			</p>
		{/if}
	</div>
</dialog>

<style>
	.viewer {
		width: 100%;
		max-width: none;
		height: 100%;
		max-height: none;
		margin: 0;
		padding: 0;
		border: 0;
		background: var(--ink);
		color: var(--paper);
		display: none;
		grid-template-rows: auto minmax(0, 1fr) auto;
	}

	.viewer[open] {
		display: grid;
		animation: viewer-in 420ms var(--ease-out) both;
	}

	.viewer::backdrop {
		background: rgb(28 27 25 / 0.5);
	}

	/* same roof-pitch wipe as the site menu */
	@keyframes viewer-in {
		from {
			clip-path: polygon(100% 0, 100% 0, 100% 0, 100% 0);
		}
		to {
			clip-path: polygon(-60% 0, 100% 0, 100% 100%, -60% 100%);
		}
	}

	.bar {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem var(--gutter);
	}

	.title {
		font-size: var(--fs-h3);
		font-weight: 500;
		line-height: 1.05;
		text-transform: uppercase;
	}

	.loc {
		margin-top: 0.35rem;
		color: var(--steel-on-dark);
	}

	.track {
		display: flex;
		margin: 0;
		padding: 0;
		list-style: none;
		overflow-x: auto;
		overscroll-behavior-x: contain;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
	}

	.track::-webkit-scrollbar {
		display: none;
	}

	.slide {
		flex: 0 0 100%;
		min-width: 0;
		padding-inline: var(--gutter);
		scroll-snap-align: start;
	}

	.slide :global(.photo) {
		object-fit: contain;
	}

	.foot {
		display: grid;
		gap: 0.75rem 2rem;
		padding: 1rem var(--gutter) 1.25rem;
	}

	.caption {
		max-width: 60ch;
		font-size: var(--fs-small);
	}

	.controls {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.count {
		margin-right: auto;
		color: var(--steel-on-dark);
	}

	.arrow-btn {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		background: var(--paper);
		color: var(--ink);
		border: 0;
		cursor: pointer;
		transition: background-color 160ms var(--ease-out);
	}

	.arrow-btn:hover:not([aria-disabled='true']) {
		background: #ffffff;
	}

	/* aria-disabled, not disabled: the button keeps focus at either end */
	.arrow-btn[aria-disabled='true'] {
		opacity: 0.3;
		cursor: default;
	}

	.arrow-btn:focus-visible {
		outline: 2px solid var(--orange);
		outline-offset: 2px;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.25rem;
		color: var(--steel-on-dark);
	}

	.meta a {
		color: var(--paper);
		text-underline-offset: 0.2em;
	}

	.meta a:focus-visible {
		outline: 2px solid var(--orange);
		outline-offset: 2px;
	}

	@media (min-width: 56rem) {
		.foot {
			grid-template-columns: 1fr auto;
			align-items: center;
		}

		.meta {
			grid-column: 1 / -1;
		}

		.count {
			margin-right: 0.8rem;
		}
	}
</style>
