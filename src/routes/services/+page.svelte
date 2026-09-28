<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import Photo from '$lib/components/Photo.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ServiceGlyph from '$lib/components/ServiceGlyph.svelte';
	import ProcessList from '$lib/components/ProcessList.svelte';
	import { photos } from '$lib/content/photos';
	import { services, type ServiceGroup } from '$lib/content/services';
	import { site } from '$lib/content/site';

	const group = (slug: ServiceGroup['slug']) => services.find((s) => s.slug === slug)!;
	const construction = group('construction');
	const renovation = group('renovation');
	const plans = group('plans-permits');
	const rentals = group('rentals');
</script>

<Seo
	title="Services"
	description="General construction of residential and commercial buildings, house improvement and renovation, complete building plans, PRC sign & seal, permit assistance and equipment rental in Cebu."
/>

<PageHero
	id="services-title"
	title="What we build, draw, permit and rent."
	lead="From the first site visit to handover, SAS carries the plans, the permits and the build, and rents out the machines that do the heavy work."
	photo={photos.rebarTops}
>
	{#snippet meta()}
		<span>Cebu City · Mandaue · Talisay</span>
		<span>{site.hours}</span>
	{/snippet}
	{#snippet actions()}
		<a class="btn" href="/contact?type=build">
			<span>Book an ocular inspection</span>
			<Icon name="arrow" class="arrow" />
		</a>
	{/snippet}
</PageHero>

<nav class="jump frame" aria-label="Services on this page">
	<ul role="list">
		{#each services as s (s.slug)}
			<li>
				<a href={s.slug === 'rentals' ? '#rentals' : '#' + s.slug}>{s.title}</a>
			</li>
		{/each}
	</ul>
</nav>

<!-- Construction -->
<section id="construction" class="split" aria-labelledby="construction-title">
	<div class="split-media" data-reveal="wipe">
		<Photo photo={construction.photo} sizes="(min-width: 64rem) 50vw, 100vw" />
		<ServiceGlyph name="frame" class="split-glyph" />
	</div>
	<div class="split-copy" data-reveal style:--i={1}>
		<h2 id="construction-title" class="display h2">{construction.title}</h2>
		<p class="lead muted">{construction.summary}</p>
		<ul class="items" role="list">
			{#each construction.items as item, i (item.name)}
				<li data-reveal style:--i={i + 2}>
					<h3 class="item-name">{item.name}</h3>
					<p class="item-detail">{item.detail}</p>
				</li>
			{/each}
		</ul>
		<a class="btn btn-ink" href="/contact?type=build">
			<span>Start a build inquiry</span>
			<Icon name="arrow" class="arrow" />
		</a>
	</div>
</section>

<!-- Renovation -->
<section id="renovation" class="split split-rev" aria-labelledby="renovation-title">
	<div class="split-media" data-reveal="wipe">
		<Photo photo={renovation.photo} sizes="(min-width: 64rem) 50vw, 100vw" />
		<ServiceGlyph name="tile" class="split-glyph" />
	</div>
	<div class="split-copy" data-reveal style:--i={1}>
		<h2 id="renovation-title" class="display h2">{renovation.title}</h2>
		<p class="lead muted">{renovation.summary}</p>
		<ul class="items" role="list">
			{#each renovation.items as item, i (item.name)}
				<li data-reveal style:--i={i + 2}>
					<h3 class="item-name">{item.name}</h3>
					<p class="item-detail">{item.detail}</p>
				</li>
			{/each}
		</ul>
		<a class="btn btn-ink" href="/contact?type=build&project=House%20improvement%20or%20renovation">
			<span>Ask about your house</span>
			<Icon name="arrow" class="arrow" />
		</a>
	</div>
</section>

<!-- Plans & permits -->
<section id="plans-permits" class="split" aria-labelledby="plans-title">
	<div class="split-media" data-reveal="wipe">
		<Photo photo={plans.photo} sizes="(min-width: 64rem) 50vw, 100vw" />
		<ServiceGlyph name="plan" class="split-glyph" />
	</div>
	<div class="split-copy" data-reveal style:--i={1}>
		<h2 id="plans-title" class="display h2">{plans.title}</h2>
		<p class="lead muted">{plans.summary}</p>
		<ul class="items" role="list">
			{#each plans.items as item, i (item.name)}
				<li data-reveal style:--i={i + 2}>
					<h3 class="item-name">{item.name}</h3>
					<p class="item-detail">{item.detail}</p>
				</li>
			{/each}
		</ul>
		<a class="btn btn-ink" href="/contact?type=build&project=Plans%20%26%20permits">
			<span>Ask about plans & permits</span>
			<Icon name="arrow" class="arrow" />
		</a>
	</div>
</section>

<!-- Rentals -->
<section id="rentals" class="rent-band on-dark" aria-labelledby="rent-title">
	<div class="frame rent-grid">
		<div class="rent-plate chamfer on-orange blueprint-orange" data-reveal="wipe">
			<ServiceGlyph name="compactor" class="rent-glyph" />
		</div>
		<div class="rent-copy" data-reveal style:--i={1}>
			<h2 id="rent-title" class="display h2">{rentals.title}</h2>
			<p class="body rent-text">{rentals.summary}</p>
			<div class="rent-actions">
				<a class="btn" href="/rentals">
					<span>See equipment</span>
					<Icon name="arrow" class="arrow" />
				</a>
				<a class="btn btn-paper" href="/contact?type=rent">
					<span>Ask availability</span>
					<Icon name="arrow" class="arrow" />
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Process -->
<section class="process" aria-labelledby="process-title">
	<div class="frame process-grid">
		<div data-reveal>
			<h2 id="process-title" class="display h2">Quoted from your site, built to your budget.</h2>
			<p class="lead muted process-lead">
				No rate card. Every project is priced from an ocular inspection and a bill of materials made for your
				lot and your design.
			</p>
		</div>
		<ProcessList />
	</div>
</section>

<style>
	.jump {
		padding-block: 1.25rem;
		border-bottom: 1px solid var(--line);
	}

	.jump ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin: 0;
	}

	.jump a {
		display: block;
		padding: 0.45rem 0.8rem;
		border: 1px solid var(--line-strong);
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		text-decoration: none;
		transition:
			background-color 160ms var(--ease-out),
			color 160ms var(--ease-out);
	}

	.jump a:hover {
		background: var(--ink);
		color: var(--paper);
	}

	/* ── Split sections ────────────────────────────── */
	.split {
		display: grid;
		border-bottom: 1px solid var(--line);
	}

	.split-media {
		position: relative;
		min-height: 20rem;
		overflow: hidden;
		background: var(--ink);
	}

	.split-media :global(.photo) {
		position: absolute;
		inset: 0;
		opacity: 0.72;
	}

	.split-media :global(.split-glyph) {
		position: absolute;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
		width: clamp(8rem, 6rem + 8vw, 14rem);
		color: var(--paper);
		stroke-width: 1.2;
	}

	.split-copy {
		display: grid;
		justify-items: start;
		align-content: start;
		gap: 1.5rem;
		padding: var(--section) var(--gutter);
	}

	.items {
		width: 100%;
		max-width: 40rem;
		margin: 0.5rem 0;
		border-top: 1px solid var(--line-strong);
	}

	.items li {
		position: relative;
		padding: 1rem 0 1rem 1.75rem;
		border-bottom: 1px solid var(--line);
	}

	/* orange roof marker */
	.items li::before {
		content: '';
		position: absolute;
		left: 0.2rem;
		top: 1.45rem;
		width: 0.7rem;
		height: 0.42rem;
		background: var(--orange);
		clip-path: polygon(50% 0, 100% 60%, 100% 100%, 50% 40%, 0 100%, 0 60%);
	}

	.item-name {
		font-size: 1.125rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		line-height: 1.2;
	}

	.item-detail {
		margin-top: 0.3rem;
		color: var(--steel);
		max-width: 56ch;
	}

	@media (min-width: 64rem) {
		.split {
			grid-template-columns: 1fr 1fr;
			min-height: 44rem;
		}

		.split-media {
			min-height: 100%;
			clip-path: polygon(0 0, 100% 0, 100% calc(100% - 9.6rem), calc(100% - 16rem) 100%, 0 100%);
		}

		.split-rev .split-media {
			order: 2;
			clip-path: polygon(0 0, 100% 0, 100% 100%, 16rem 100%, 0 calc(100% - 9.6rem));
		}

		.split-copy {
			padding-left: clamp(2rem, 1rem + 3vw, 5rem);
		}
	}

	/* ── Rentals band ──────────────────────────────── */
	.rent-band {
		padding-block: var(--section);
	}

	.rent-grid {
		display: grid;
		gap: 2.5rem;
		align-items: center;
	}

	.rent-plate {
		--c: var(--cut-lg);
		display: grid;
		place-items: center;
		aspect-ratio: 4 / 3;
		max-height: 26rem;
	}

	.rent-plate :global(.rent-glyph) {
		width: 55%;
		max-width: 16rem;
		color: var(--ink);
	}

	.rent-copy {
		display: grid;
		justify-items: start;
		gap: 1.5rem;
	}

	.rent-text {
		color: var(--steel-on-dark);
	}

	.rent-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	@media (min-width: 64rem) {
		.rent-grid {
			grid-template-columns: 5fr 7fr;
			gap: 4rem;
		}
	}

	/* ── Process ───────────────────────────────────── */
	.process {
		padding-block: var(--section);
	}

	.process-grid {
		display: grid;
		gap: 2.5rem;
	}

	.process-grid .h2 {
		max-width: 13ch;
	}

	.process-lead {
		margin-top: 1.5rem;
	}

	@media (min-width: 64rem) {
		.process-grid {
			grid-template-columns: 5fr 7fr;
			gap: 0;
		}

		.process-grid > :first-child {
			padding-right: var(--gutter);
		}

		.process-grid > :last-child {
			padding-left: var(--gutter);
			border-left: 1px solid var(--line);
		}
	}
</style>
