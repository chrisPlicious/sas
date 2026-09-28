<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { photos } from '$lib/content/photos';
	import { projects, projectCategories, type ProjectCategory } from '$lib/content/projects';

	let filter = $state<ProjectCategory | 'All'>('All');

	const shown = $derived(filter === 'All' ? projects : projects.filter((p) => p.category === filter));

	const counts = $derived(
		Object.fromEntries(projectCategories.map((c) => [c, projects.filter((p) => p.category === c).length]))
	);
</script>

<Seo
	title="Projects"
	description="Houses, townhouses, renovations and light commercial work by SAS Construction around Cebu City, Mandaue and Talisay."
/>

<PageHero
	id="projects-title"
	title="Projects around Cebu."
	lead="Two-storey homes, renovations and commercial fit-outs, followed from ocular inspection to handover with progress videos along the way."
	photo={photos.frameTall}
>
	{#snippet meta()}
		<span>Residential · Commercial</span>
		<span>Renovation · Finishing</span>
	{/snippet}
	{#snippet actions()}
		<a class="btn" href="/contact?type=build">
			<span>Plan a project like these</span>
			<Icon name="arrow" class="arrow" />
		</a>
	{/snippet}
</PageHero>

<section class="work" aria-labelledby="work-title">
	<div class="frame work-head" data-reveal>
		<h2 id="work-title" class="display h2">On site and handed over.</h2>
		<div class="filters" role="group" aria-label="Filter projects by type">
			<button type="button" class="filter" aria-pressed={filter === 'All'} onclick={() => (filter = 'All')}>
				All <span class="count mono">{projects.length}</span>
			</button>
			{#each projectCategories as c (c)}
				<button type="button" class="filter" aria-pressed={filter === c} onclick={() => (filter = c)}>
					{c} <span class="count mono">{counts[c]}</span>
				</button>
			{/each}
		</div>
	</div>

	<p class="visually-hidden" aria-live="polite">Showing {shown.length} projects</p>

	<ul class="frame grid" role="list">
		{#each shown as project, i (project.title)}
			<li data-reveal="wipe" style:--i={i % 2}><ProjectCard {project} sizes="(min-width: 56rem) 45vw, 92vw" /></li>
		{/each}
	</ul>
</section>

<style>
	.work {
		padding-block: var(--section);
	}

	.work-head {
		display: grid;
		gap: 1.75rem;
		margin-bottom: 2.5rem;
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.filter {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		min-height: 2.5rem;
		padding: 0.45rem 0.8rem;
		background: var(--paper-2);
		border: 0;
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		cursor: pointer;
		transition: background-color 160ms var(--ease-out);
	}

	.filter:hover {
		background: var(--concrete);
	}

	.filter[aria-pressed='true'] {
		background: var(--orange);
	}

	.filter:focus-visible {
		outline-offset: 2px;
	}

	.count {
		font-size: 0.6875rem;
		color: var(--steel);
	}

	.filter[aria-pressed='true'] .count {
		color: var(--on-orange-2);
	}

	.grid {
		display: grid;
		gap: 0.5rem;
		margin: 0 auto;
	}

	@media (min-width: 56rem) {
		.work-head {
			grid-template-columns: 1fr auto;
			align-items: end;
		}

		.grid {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
