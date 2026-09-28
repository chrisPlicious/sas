<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Photo as PhotoT } from '$lib/content/photos';
	import Photo from './Photo.svelte';

	let {
		title,
		lead,
		photo,
		meta,
		actions,
		id,
		photoNote
	}: {
		title: string;
		lead: string;
		photo: PhotoT;
		meta?: Snippet;
		actions?: Snippet;
		id: string;
		/** Visible tag for stand-in photos that could be mistaken for SAS's own work or fleet. */
		photoNote?: string;
	} = $props();
</script>

<section class="ph" aria-labelledby={id}>
	<div class="ph-title">
		<h1 {id} class="display ph-h1">{title}</h1>
	</div>
	<div class="ph-meta mono">
		{@render meta?.()}
	</div>
	<div class="ph-panel on-dark">
		<p class="ph-lead">{lead}</p>
		{#if actions}
			<div class="ph-actions">{@render actions()}</div>
		{/if}
	</div>
	<div class="ph-photo">
		<Photo {photo} eager sizes="(min-width: 64rem) 60vw, 100vw" />
		{#if photoNote}
			<span class="tag tag-sample ph-note">{photoNote}</span>
		{/if}
	</div>
</section>

<style>
	.ph {
		display: grid;
		grid-template-columns: 100%;
	}

	.ph-title {
		padding: 8rem var(--gutter) 2.5rem;
	}

	.ph-h1 {
		font-size: clamp(2.4rem, 1.1rem + 3.9vw, 5.2rem);
		max-width: 9.8em; /* em, not ch: stable before the webfont swaps in */
		animation: rise 900ms var(--ease-out) both;
	}

	@keyframes rise {
		from {
			opacity: 0;
			translate: 0 0.3em;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}

	.ph-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.5rem;
		padding: 0 var(--gutter) 2rem;
		color: var(--steel);
	}

	.ph-meta:empty {
		display: none;
	}

	.ph-panel {
		display: grid;
		align-content: space-between;
		justify-items: start;
		gap: 2rem;
		padding: 2rem var(--gutter);
	}

	.ph-lead {
		font-size: var(--fs-lead);
		line-height: 1.4;
		max-width: 38ch;
		text-wrap: pretty;
	}

	.ph-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.ph-photo {
		position: relative;
		height: clamp(15rem, 40svh, 26rem);
		overflow: hidden;
		background: var(--concrete);
	}

	.ph-note {
		position: absolute;
		right: 0.75rem;
		bottom: 0.75rem;
	}

	@media (min-width: 64rem) {
		.ph {
			grid-template-columns: 5fr 7fr;
			grid-template-rows: auto minmax(22rem, 44svh);
		}

		.ph-title {
			grid-area: 1 / 1 / 2 / 3;
			padding: 9.5rem var(--gutter) 3rem;
		}

		.ph-meta {
			grid-area: 1 / 2 / 2 / 3;
			margin-left: 29%;
			align-self: stretch;
			flex-direction: column;
			justify-content: flex-end;
			padding: 9.5rem var(--gutter) 3rem;
			border-left: 1px solid var(--line);
		}

		.ph-panel {
			grid-area: 2 / 1 / 3 / 2;
			/* keep the lead clear of the photo's roof-pitch cut */
			padding: 2.5rem calc(var(--gutter) + 9rem) 2.5rem var(--gutter);
		}

		.ph-photo {
			grid-area: 2 / 2 / 3 / 3;
			height: auto;
			margin-left: -9rem;
			clip-path: polygon(9rem 0, 100% 0, 100% 100%, 0 100%, 0 5.4rem);
		}
	}
</style>
