<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Photo from '$lib/components/Photo.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ServiceGlyph from '$lib/components/ServiceGlyph.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ProcessList from '$lib/components/ProcessList.svelte';
	import { photos } from '$lib/content/photos';
	import { services, permits } from '$lib/content/services';
	import { projects } from '$lib/content/projects';
	import { site, primaryPhone } from '$lib/content/site';

	let track: HTMLElement | undefined;

	const registerTrack = (node: HTMLElement) => {
		track = node;
		return () => (track = undefined);
	};

	function slide(dir: 1 | -1) {
		if (!track) return;
		const card = track.querySelector<HTMLElement>('li');
		const step = card ? card.offsetWidth + 8 : track.clientWidth * 0.8;
		track.scrollBy({ left: dir * step, behavior: 'smooth' });
	}
</script>

<Seo
	title=""
	description="SAS Construction builds, improves and renovates homes and light commercial buildings in Cebu, with complete building plans, sign & seal and permit assistance, and rents construction equipment across Cebu."
/>

<!-- ── Hero: two doors ─────────────────────────────── -->
<section class="hero" aria-labelledby="hero-title">
	<div class="hero-photo">
		<Photo photo={photos.frameGrid} eager sizes="100vw" />
	</div>
	<span class="h-line" aria-hidden="true"></span>
	<span class="v-line" aria-hidden="true"></span>
	<span class="hero-tick" aria-hidden="true"><span class="tick"></span></span>

	<div class="hero-build">
		<h1 id="hero-title" class="display hero-title">
			<span class="line">We build from</span>
			<span class="line">plan to roof.</span>
			<span class="line">We rent what</span>
			<span class="line">builds it.</span>
		</h1>
		<div class="doors">
			<a class="btn btn-lg btn-ink door" href="/contact?type=build">
				<span>Build with SAS</span>
				<Icon name="arrow" class="arrow" />
			</a>
			<a class="btn btn-lg door door-rent" href="/rentals">
				<span>Rent equipment</span>
				<Icon name="arrow" class="arrow" />
			</a>
		</div>
		<p class="hero-sub">
			Houses, townhouses, renovations and light commercial work in Cebu: plans, sign & seal, permits and
			the build, all from one family-run contractor.
		</p>
	</div>

	<div class="hero-rent on-orange">
		<div class="rent-meta mono">
			<span>{site.address.line2}</span>
			<span>{site.hours}</span>
		</div>
		<div class="rent-body">
			<h2 class="display rent-title">Equipment for rent</h2>
			<p>
				Machinery and tools for contractors, subcontractors and homebuilders across Cebu. Rates quoted per
				job.
			</p>
			<a class="btn btn-ink" href="/rentals">
				<span>See equipment</span>
				<Icon name="arrow" class="arrow" />
			</a>
		</div>
		<a class="rent-call on-dark" href="tel:{primaryPhone.tel}">
			<span class="mono">Call or text</span>
			<span class="rent-number">{primaryPhone.label}</span>
		</a>
	</div>
</section>

<!-- ── Plans & permits ─────────────────────────────── -->
<section class="permits on-dark" aria-labelledby="permits-title">
	<div class="frame permits-grid">
		<ul class="permit-tiles" role="list">
			{#each permits as permit, i (permit.name)}
				<li class="permit chamfer on-orange" data-reveal="wipe" style:--i={i}>
					<span class="permit-name">{permit.name}</span>
					<span class="mono permit-note">{permit.note}</span>
				</li>
			{/each}
		</ul>
		<div class="permits-panel chamfer" data-reveal="wipe" style:--i={2}>
			<h2 id="permits-title" class="display h2">Signed, sealed and permitted.</h2>
			<div class="permits-foot">
				<p class="body">
					Architectural, structural, electrical and sanitary/plumbing plans are signed and sealed by
					PRC-licensed professionals. Then we prepare and process the permit your project needs, from the
					first excavation to the day you move in.
				</p>
				<a class="btn btn-ink" href="/services#plans-permits">
					<span>Plans & permits</span>
					<Icon name="arrow" class="arrow" />
				</a>
			</div>
		</div>
	</div>
</section>

<!-- ── Services ─────────────────────────────────────── -->
<section class="services" aria-labelledby="services-title">
	<div class="frame services-grid">
		<div class="services-intro" data-reveal>
			<h2 id="services-title" class="display h2">From empty lot to finished house.</h2>
			<p class="lead muted">
				One contractor for the drawings, the permits, the build, the renovation, and the machines on site.
			</p>
			<a class="btn btn-ink" href="/services">
				<span>All services</span>
				<Icon name="arrow" class="arrow" />
			</a>
		</div>

		<ul class="plates" role="list">
			{#each services as service, i (service.slug)}
				<li data-reveal="wipe" style:--i={i + 1}>
					<a class="plate-link" href={service.href}>
						<div class="plate-top chamfer" class:is-orange={i === 0}>
							<h3 class="plate-title">{service.title}</h3>
							<ServiceGlyph name={service.icon} class="plate-glyph" />
						</div>
						{#if service.slug === 'rentals'}
							<p class="plate-cap chamfer" class:is-orange={i === 0}>{service.short}</p>
						{:else}
							<ul class="plate-cap plate-list chamfer" class:is-orange={i === 0} role="list">
								{#each service.items as item (item.name)}
									<li>{item.name}</li>
								{/each}
							</ul>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ── Process ──────────────────────────────────────── -->
<section class="process" aria-labelledby="process-title">
	<div class="frame process-grid">
		<div data-reveal>
			<h2 id="process-title" class="display h2">How a job runs, lot to handover.</h2>
			<p class="lead muted process-lead">
				Every quote starts on your site, not on a price list. That's how the numbers end up fitting your
				budget.
			</p>
		</div>
		<ProcessList />
	</div>
</section>

<!-- ── Projects ─────────────────────────────────────── -->
<section class="projects" aria-labelledby="projects-title">
	<div class="frame projects-head" data-reveal>
		<h2 id="projects-title" class="display h2">Work around Cebu.</h2>
		<div class="projects-controls">
			<button class="arrow-btn" type="button" onclick={() => slide(-1)} aria-label="Previous projects">
				<Icon name="arrow-left" size={18} />
			</button>
			<button class="arrow-btn" type="button" onclick={() => slide(1)} aria-label="Next projects">
				<Icon name="arrow" size={18} />
			</button>
			<a class="btn btn-sm" href="/projects">
				<span>All projects</span>
				<Icon name="arrow" size={16} class="arrow" />
			</a>
		</div>
	</div>
	<ul class="track" role="list" {@attach registerTrack}>
		{#each projects.filter((p) => p.gallery) as project, i (project.slug)}
			<li data-reveal="wipe" style:--i={i}><ProjectCard {project} /></li>
		{/each}
	</ul>
</section>

<!-- ── Rentals ──────────────────────────────────────── -->
<section class="rentals on-dark" aria-labelledby="rentals-title">
	<div class="frame rentals-grid">
		<div class="rentals-copy" data-reveal>
			<h2 id="rentals-title" class="display h2">Affordable construction equipment for rent in Cebu.</h2>
			<p class="body rentals-text">
				Machinery and tools for contractors, subcontractors and private homebuilders. Tell us the job and the
				dates, and we'll confirm what's available and quote the rate.
			</p>
			<div class="rentals-actions">
				<a class="btn" href="/rentals">
					<span>See equipment</span>
					<Icon name="arrow" class="arrow" />
				</a>
				<a class="btn btn-paper" href="/contact?type=rent">
					<span>Ask availability</span>
					<Icon name="arrow" class="arrow" />
				</a>
			</div>
			<dl class="spec mono">
				<div><dt>Rates</dt><dd>Quoted per job</dd></div>
				<div><dt>Area</dt><dd>Cebu City · Mandaue · Talisay</dd></div>
				<div><dt>Inquiries</dt><dd>24 hours</dd></div>
			</dl>
		</div>
		<div class="rentals-photo" data-reveal="wipe" style:--i={1}>
			<Photo photo={photos.mixerCrew} sizes="(min-width: 64rem) 50vw, 100vw" />
			<span class="tag tag-sample rentals-note">Sample photo</span>
		</div>
	</div>
</section>

<style>
	/* ── Hero ───────────────────────────────────────── */
	.hero {
		--rent-cut: 42vw;
		display: grid;
		grid-template-columns: 100%;
		grid-template-areas:
			'photo'
			'build'
			'rent';
		position: relative;
	}

	.hero-photo {
		grid-area: photo;
		height: clamp(17rem, 42svh, 30rem);
		overflow: hidden;
		background: var(--concrete);
	}

	.h-line,
	.v-line,
	.hero-tick {
		display: none;
	}

	.hero-build {
		grid-area: build;
		padding: 2rem var(--gutter) 2.5rem;
	}

	.hero-title {
		font-size: clamp(2.5rem, 1rem + 3.3vw, 4.4rem);
		line-height: 0.95;
		font-weight: 500;
	}

	.line {
		display: block;
		animation: rise 900ms var(--ease-out) both;
	}

	.line:nth-child(2) {
		animation-delay: 70ms;
	}

	.line:nth-child(3) {
		animation-delay: 140ms;
	}

	.line:nth-child(4) {
		animation-delay: 210ms;
	}

	@keyframes rise {
		from {
			opacity: 0;
			translate: 0 0.35em;
			clip-path: inset(0 0 100% 0);
		}
		to {
			opacity: 1;
			translate: 0 0;
			clip-path: inset(0 0 -10% 0);
		}
	}

	.doors {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.4rem;
		margin-top: 1.75rem;
		max-width: 34rem;
	}

	.door {
		font-size: 0.9375rem;
		padding-inline: 0.9rem 0.8rem;
	}

	.hero-sub {
		margin-top: 1.5rem;
		max-width: 46ch;
		color: var(--steel);
		text-wrap: pretty;
	}

	.hero-rent {
		grid-area: rent;
		display: flex;
		flex-direction: column;
		padding: calc(var(--rent-cut) * var(--pitch) + 0.5rem) var(--gutter) 0;
		clip-path: polygon(var(--rent-cut) 0, 100% 0, 100% 100%, 0 100%, 0 calc(var(--rent-cut) * var(--pitch)));
		animation: panel-in 1100ms var(--ease-out) 120ms both;
	}

	@keyframes panel-in {
		from {
			clip-path: polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%);
		}
		to {
			clip-path: polygon(
				var(--rent-cut) 0,
				100% 0,
				100% 100%,
				0 100%,
				0 calc(var(--rent-cut) * var(--pitch))
			);
		}
	}

	.rent-meta {
		position: absolute;
		top: 1rem;
		right: var(--gutter);
		display: grid;
		justify-items: end;
		gap: 0.1rem;
		color: var(--on-orange-2);
	}

	.hero-rent {
		position: relative;
	}

	.rent-body {
		display: grid;
		justify-items: start;
		gap: 1rem;
		max-width: 32rem;
		padding-bottom: 2rem;
	}

	.rent-title {
		font-size: var(--fs-h3);
		line-height: 1;
	}

	.rent-body p {
		color: var(--on-orange-2);
		max-width: 40ch;
	}

	/* Phone notch: ink trapezoid bottom-right, left edge at roof pitch */
	.rent-call {
		align-self: flex-end;
		display: grid;
		justify-items: end;
		gap: 0.15rem;
		margin-right: calc(var(--gutter) * -1);
		padding: 1rem var(--gutter) 1rem 4.5rem;
		text-decoration: none;
		clip-path: polygon(3rem 0, 100% 0, 100% 100%, 0 100%);
		transition: background-color 180ms var(--ease-out);
	}

	.rent-call .mono {
		color: var(--steel-on-dark);
	}

	.rent-number {
		font-size: clamp(1.35rem, 1.1rem + 1vw, 1.9rem);
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--orange);
		line-height: 1;
	}

	.rent-call:hover {
		background: var(--ink-3);
	}

	.rent-call:focus-visible {
		outline: 2px solid var(--orange);
		outline-offset: -5px;
	}

	@media (min-width: 64rem) {
		.hero {
			--rent-cut: 11rem;
			grid-template-columns: minmax(0, 1fr) minmax(24rem, 36%);
			grid-template-rows: minmax(9rem, 27svh) minmax(8rem, 22svh) auto;
			grid-template-areas: none;
			min-height: min(100svh, 62rem);
		}

		.hero-photo {
			grid-area: 1 / 1 / 3 / 3;
			height: auto;
		}

		.h-line,
		.v-line,
		.hero-tick {
			display: block;
			pointer-events: none;
		}

		.h-line {
			grid-area: 2 / 1 / 3 / 3;
			border-top: 1px solid rgb(242 241 236 / 0.55);
		}

		.v-line {
			grid-area: 1 / 2 / 2 / 3;
			border-left: 1px solid rgb(242 241 236 / 0.55);
		}

		.hero-tick {
			grid-area: 2 / 2 / 3 / 3;
			position: relative;
			color: var(--paper);
		}

		.hero-tick .tick {
			left: 0;
			top: 0;
		}

		.hero-build {
			grid-area: 3 / 1 / 4 / 2;
			display: grid;
			grid-template-columns: auto 1fr;
			grid-template-areas:
				'title title'
				'doors sub';
			column-gap: 2.5rem;
			align-items: end;
			padding: 2.5rem var(--gutter) 2.75rem;
			border-right: 1px solid var(--line);
		}

		.hero-title {
			grid-area: title;
		}

		.doors {
			grid-area: doors;
			grid-template-columns: auto;
			width: 17rem;
			margin-top: 2rem;
		}

		.hero-sub {
			grid-area: sub;
			margin: 0;
			align-self: end;
			font-size: var(--fs-small);
		}

		.door-rent {
			display: none;
		}

		.hero-rent {
			grid-area: 2 / 2 / 4 / 3;
			padding-top: 1rem;
		}

		.rent-meta {
			position: static;
			justify-items: end;
			text-align: right;
		}

		.hero-title {
			font-size: clamp(2.5rem, 1rem + 4.1vw, 5.5rem);
		}

		.rent-body {
			margin-top: auto;
			padding-bottom: 2.25rem;
		}
	}

	/* ── Permits ────────────────────────────────────── */
	.permits {
		padding-block: 0.5rem;
	}

	.permits-grid {
		display: grid;
		gap: 0.5rem;
		padding-inline: 0.5rem;
		max-width: none;
	}

	.permit-tiles {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
		margin: 0;
	}

	.permit {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2.5rem;
		min-height: 11rem;
		padding: 1.1rem 1.1rem 1rem;
	}

	.permit-name {
		font-size: clamp(1.3rem, 1rem + 1.2vw, 2.1rem);
		font-weight: 500;
		line-height: 1;
		text-transform: uppercase;
		text-wrap: balance;
	}

	.permit-note {
		color: var(--on-orange-2);
	}

	.permits-panel {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 3rem;
		padding: clamp(1.25rem, 1rem + 1.5vw, 2.25rem);
		background: var(--concrete);
		color: var(--ink);
	}

	.permits-panel .h2 {
		max-width: 12ch;
	}

	.permits-foot {
		display: grid;
		justify-items: start;
		gap: 1.25rem;
	}

	.permits-foot .body {
		max-width: 52ch;
		color: #3b3a36;
	}

	@media (min-width: 56rem) {
		.permits-grid {
			grid-template-columns: 1fr 1fr;
		}

		.permit {
			min-height: 14rem;
		}
	}

	/* ── Services ───────────────────────────────────── */
	.services {
		padding-block: var(--section) calc(var(--section) * 0.6);
	}

	.services-grid {
		display: grid;
		gap: 3rem;
	}

	.services-intro {
		display: grid;
		align-content: start;
		justify-items: start;
		gap: 1.5rem;
	}

	.services-intro .h2 {
		max-width: 11ch;
	}

	.plates {
		display: grid;
		gap: 0.5rem;
		margin: 0;
	}

	.plate-link {
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 0.35rem;
		text-decoration: none;
		height: 100%;
	}

	.plate-link:focus-visible {
		outline-offset: 4px;
	}

	.plate-top {
		position: relative;
		display: grid;
		grid-template-rows: auto 1fr;
		min-height: 17rem;
		padding: 1.1rem 1.2rem;
		background-color: var(--ink-2);
		color: var(--paper);
		background-image:
			linear-gradient(var(--line-dark) 1px, transparent 1px),
			linear-gradient(90deg, var(--line-dark) 1px, transparent 1px);
		background-size: 18px 18px;
		transition: background-color 240ms var(--ease-out);
	}

	.plate-top.is-orange {
		background-color: var(--orange);
		color: var(--ink);
		background-image:
			linear-gradient(rgb(28 27 25 / 0.1) 1px, transparent 1px),
			linear-gradient(90deg, rgb(28 27 25 / 0.1) 1px, transparent 1px);
	}

	.plate-title {
		font-size: clamp(1.25rem, 1rem + 0.8vw, 1.7rem);
		font-weight: 500;
		line-height: 1;
		text-transform: uppercase;
		max-width: 10ch;
	}

	.plate-top :global(.plate-glyph) {
		align-self: center;
		justify-self: center;
		width: clamp(6.5rem, 5rem + 5vw, 9rem);
		height: auto;
		margin-block: 1.5rem;
		transition: translate 500ms var(--ease-out);
	}

	.plate-link:hover .plate-top:not(.is-orange) {
		background-color: var(--ink-3);
	}

	.plate-link:hover :global(.plate-glyph) {
		translate: 0 -6px;
	}

	.plate-cap {
		padding: 0.9rem 1.2rem;
		background: var(--ink-2);
		color: var(--steel-on-dark);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.03em;
		line-height: 1.5;
		text-transform: uppercase;
	}

	.plate-cap.is-orange {
		background: var(--orange);
		color: var(--on-orange-2);
	}

	/* Every service by name, each on its own roof marker */
	.plate-list {
		display: grid;
		align-content: start;
		gap: 0.35rem;
		margin: 0;
	}

	.plate-list li {
		position: relative;
		padding-left: 1.1rem;
	}

	.plate-list li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.5em;
		width: 0.6rem;
		height: 0.36rem;
		background: var(--orange);
		clip-path: polygon(50% 0, 100% 60%, 100% 100%, 50% 40%, 0 100%, 0 60%);
	}

	.plate-list.is-orange li::before {
		background: var(--ink);
	}

	@media (min-width: 40rem) {
		.plates {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (min-width: 64rem) {
		.services-grid {
			grid-template-columns: 4fr 7fr;
			gap: 0;
		}

		.services-intro {
			position: sticky;
			top: 2rem;
			align-self: start;
			padding-right: var(--gutter);
		}

		.plates {
			padding-left: var(--gutter);
			border-left: 1px solid var(--line);
		}
	}

	/* ── Process ────────────────────────────────────── */
	.process {
		padding-block: 0 var(--section);
	}

	.process-grid {
		display: grid;
		gap: 2.5rem;
		padding-top: var(--section);
		border-top: 1px solid var(--line);
	}

	.process-grid .h2 {
		max-width: 12ch;
	}

	.process-lead {
		margin-top: 1.5rem;
	}

	@media (min-width: 64rem) {
		.process-grid {
			grid-template-columns: 4fr 7fr;
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

	/* ── Projects ───────────────────────────────────── */
	.projects {
		padding-bottom: var(--section);
	}

	.projects-head {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		justify-content: space-between;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.projects-controls {
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	.arrow-btn {
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		background: var(--ink);
		color: var(--paper);
		border: 0;
		cursor: pointer;
		transition: background-color 160ms var(--ease-out);
	}

	.arrow-btn:hover {
		background: var(--ink-3);
	}

	.arrow-btn:focus-visible {
		outline-offset: 2px;
	}

	.projects-controls .btn {
		margin-left: 0.5rem;
	}

	.track {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: min(85vw, 36rem);
		gap: 0.5rem;
		margin: 0;
		padding-inline: max(var(--gutter), calc((100vw - var(--frame-max)) / 2 + var(--gutter)));
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-padding-inline: max(var(--gutter), calc((100vw - var(--frame-max)) / 2 + var(--gutter)));
		scrollbar-width: none;
		overscroll-behavior-x: contain;
	}

	.track::-webkit-scrollbar {
		display: none;
	}

	.track > li {
		scroll-snap-align: start;
	}

	/* ── Rentals ────────────────────────────────────── */
	.rentals {
		overflow: hidden;
	}

	.rentals-grid {
		display: grid;
		max-width: none;
		padding: 0;
	}

	.rentals-copy {
		display: grid;
		justify-items: start;
		align-content: center;
		gap: 1.5rem;
		padding: var(--section) var(--gutter);
	}

	.rentals-copy .h2 {
		max-width: 16ch;
	}

	.rentals-text {
		color: var(--steel-on-dark);
	}

	.rentals-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.spec {
		display: grid;
		gap: 0;
		width: 100%;
		max-width: 34rem;
		margin-top: 1rem;
		border-top: 1px solid var(--line-dark);
	}

	.spec div {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.6rem 0;
		border-bottom: 1px solid var(--line-dark);
	}

	.spec dt {
		color: var(--steel-on-dark);
	}

	.spec dd {
		text-align: right;
	}

	.rentals-photo {
		position: relative;
		min-height: 20rem;
		overflow: hidden;
		clip-path: polygon(9rem 0, 100% 0, 100% 100%, 0 100%, 0 5.4rem);
	}

	.rentals-note {
		position: absolute;
		right: 0.75rem;
		bottom: 0.75rem;
	}

	@media (min-width: 64rem) {
		.rentals-grid {
			grid-template-columns: 1fr 1fr;
		}

		.rentals-copy {
			padding-left: max(var(--gutter), calc((100vw - var(--frame-max)) / 2 + var(--gutter)));
		}

		.rentals-photo {
			min-height: 100%;
			clip-path: polygon(16rem 0, 100% 0, 100% 100%, 0 100%, 0 9.6rem);
		}
	}
</style>
