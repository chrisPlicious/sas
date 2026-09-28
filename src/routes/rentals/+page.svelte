<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import EquipmentCard from '$lib/components/EquipmentCard.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { photos } from '$lib/content/photos';
	import { equipment, type Equipment } from '$lib/content/equipment';
	import { site, primaryPhone } from '$lib/content/site';

	type Cat = Equipment['category'] | 'All';
	const cats: Cat[] = ['All', 'Machinery', 'Tools'];

	let cat = $state<Cat>('All');
	const shown = $derived(cat === 'All' ? equipment : equipment.filter((e) => e.category === cat));

	const steps = [
		{
			title: 'Tell us the job',
			body: 'What you are building, where the site is, and the dates you need the equipment.'
		},
		{
			title: 'We confirm and quote',
			body: 'We check what is available for your dates and give you a rate for the job.'
		},
		{
			title: 'Lock the schedule',
			body: 'Agree the dates and the handover, and the equipment is booked for your site.'
		}
	];
</script>

<Seo
	title="Equipment rental"
	description="Affordable construction equipment for rent in Cebu. Machinery and tools for contractors, subcontractors and homebuilders. Rates quoted per job."
/>

<PageHero
	id="rentals-title"
	title="Affordable construction equipment for rent in Cebu."
	lead="Machinery and tools for contractors, subcontractors and private homebuilders, from the same crew that builds with them every day."
	photo={photos.mixerYard}
	photoNote="Sample photo"
>
	{#snippet meta()}
		<span>Rates quoted per job</span>
		<span>{site.hours}</span>
	{/snippet}
	{#snippet actions()}
		<a class="btn" href="/contact?type=rent">
			<span>Ask availability</span>
			<Icon name="arrow" class="arrow" />
		</a>
		<a class="btn btn-paper" href="tel:{primaryPhone.tel}">
			<span>Call {primaryPhone.label}</span>
			<Icon name="phone" class="arrow" />
		</a>
	{/snippet}
</PageHero>

<section class="how" aria-labelledby="how-title">
	<div class="frame how-grid">
		<h2 id="how-title" class="display h2" data-reveal>Three steps to a booked machine.</h2>
		<ol class="steps" role="list">
			{#each steps as step, i (step.title)}
				<li class="step chamfer" class:on-orange={i === 0} data-reveal="wipe" style:--i={i + 1}>
					<h3 class="step-title">
						<span class="step-num" aria-hidden="true">{i + 1}</span>
						<span>{step.title}</span>
					</h3>
					<p class="step-body">{step.body}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="catalog on-dark" aria-labelledby="catalog-title">
	<div class="frame catalog-head" data-reveal>
		<h2 id="catalog-title" class="display h2">What's for rent.</h2>
		<div class="filters" role="group" aria-label="Filter equipment">
			{#each cats as c (c)}
				<button type="button" class="filter" aria-pressed={cat === c} onclick={() => (cat = c)}>{c}</button>
			{/each}
		</div>
	</div>
	<p class="visually-hidden" aria-live="polite">Showing {shown.length} items</p>
	<ul class="frame eq-grid" role="list">
		{#each shown as item, i (item.slug)}
			<li data-reveal="wipe" style:--i={i % 3}><EquipmentCard {item} /></li>
		{/each}
	</ul>
	<div class="frame">
		<div class="rate-note chamfer on-orange" data-reveal="wipe">
			<p class="rate-text">
				Rates are quoted per job, based on the equipment, the dates and the site. Call or text for availability
				today.
			</p>
			<div class="rate-phones">
				{#each site.phones as p (p.tel)}
					<a class="btn btn-ink" href="tel:{p.tel}">
						<span>{p.label}</span>
						<Icon name="phone" class="arrow" />
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	/* ── How renting works ─────────────────────────── */
	.how {
		padding-block: var(--section);
	}

	.how-grid {
		display: grid;
		gap: 2.5rem;
	}

	.how-grid .h2 {
		max-width: 12ch;
	}

	.steps {
		display: grid;
		gap: 0.5rem;
		margin: 0;
	}

	.step {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		padding: 1.25rem;
		background: var(--paper-2);
	}

	.step.on-orange .step-body {
		color: var(--on-orange-2);
	}

	.step-title {
		display: grid;
		grid-template-columns: 1.6ch 1fr;
		column-gap: 0.6rem;
		font-size: var(--fs-h3);
		font-weight: 500;
		line-height: 1;
		text-transform: uppercase;
		padding-top: 1.25rem;
	}

	.step-title > span:last-child {
		text-wrap: balance;
	}

	.step-num {
		color: var(--steel);
		font-variant-numeric: tabular-nums;
	}

	.step.on-orange .step-num {
		color: var(--on-orange-2);
	}


	.step-body {
		color: var(--steel);
		max-width: 34ch;
	}

	@media (min-width: 56rem) {
		.steps {
			grid-template-columns: repeat(3, 1fr);
		}

		.step {
			min-height: 15rem;
		}
	}

	@media (min-width: 64rem) {
		.how-grid {
			grid-template-columns: 4fr 8fr;
			align-items: start;
		}
	}

	/* ── Catalog ───────────────────────────────────── */
	.catalog {
		padding-block: var(--section);
	}

	.catalog-head {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		justify-content: space-between;
		gap: 1.5rem;
		margin-bottom: 2.5rem;
	}

	.filters {
		display: flex;
		gap: 0.35rem;
	}

	.filter {
		min-height: 2.5rem;
		padding: 0.45rem 0.9rem;
		background: var(--ink-3);
		color: var(--paper);
		border: 0;
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		cursor: pointer;
		transition: background-color 160ms var(--ease-out);
	}

	.filter:hover {
		background: #45443f;
	}

	.filter[aria-pressed='true'] {
		background: var(--orange);
		color: var(--ink);
	}

	.filter:focus-visible {
		outline-color: var(--orange);
		outline-offset: 2px;
	}

	.eq-grid {
		display: grid;
		gap: 0.5rem;
		margin: 0 auto;
	}

	@media (min-width: 40rem) {
		.eq-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (min-width: 64rem) {
		.eq-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.rate-note {
		--c: var(--cut-lg);
		display: grid;
		gap: 1.5rem;
		margin-top: 0.5rem;
		padding: clamp(1.25rem, 1rem + 1.5vw, 2.25rem);
	}

	.rate-text {
		font-size: var(--fs-lead);
		line-height: 1.35;
		font-weight: 500;
		max-width: 40ch;
	}

	.rate-phones {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	@media (min-width: 56rem) {
		.rate-note {
			grid-template-columns: 1fr auto;
			align-items: center;
		}
	}
</style>
