<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import JobOrder from '$lib/components/JobOrder.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { site } from '$lib/content/site';
</script>

<Seo
	title="Contact"
	description="Call or text SAS Construction at 0915 448 3783 or 0927 224 9302, or send a job order for a build, renovation, permit or equipment rental in Cebu."
/>

<section class="c-hero" aria-labelledby="contact-title">
	<div class="c-title">
		<h1 id="contact-title" class="display c-h1">Start a job order.</h1>
		<p class="lead muted">
			Tell us about the lot, the plans or the job site. We'll call or text you back to set the ocular inspection
			or confirm the equipment.
		</p>
	</div>

	<aside class="c-card on-orange" aria-label="Contact details">
		<p class="mono c-hours">{site.hours}</p>
		<ul class="c-phones" role="list">
			{#each site.phones as p (p.tel)}
				<li>
					<a class="c-phone" href="tel:{p.tel}">
						<span>{p.label}</span>
						<Icon name="phone" size={22} />
					</a>
				</li>
			{/each}
		</ul>
		<dl class="c-info">
			<div>
				<dt class="mono">Email</dt>
				<dd><a href="mailto:{site.email}">{site.email}</a></dd>
			</div>
			<div>
				<dt class="mono">Office</dt>
				<dd>
					{site.address.line1}, {site.address.line2}
					<a class="c-map" href={site.address.mapsUrl} rel="noopener" target="_blank">
						Open in Google Maps<span class="visually-hidden"> (opens in a new tab)</span>
					</a>
				</dd>
			</div>
			<div>
				<dt class="mono">Service area</dt>
				<dd>{site.serviceArea.join(', ')} and nearby Cebu towns</dd>
			</div>
		</dl>
	</aside>
</section>

<section class="c-form frame" aria-label="Job order form">
	<JobOrder />
</section>

<style>
	.c-hero {
		display: grid;
		border-bottom: 1px solid var(--line);
	}

	.c-title {
		display: grid;
		align-content: end;
		gap: 1.5rem;
		padding: 8rem var(--gutter) 2.5rem;
	}

	.c-h1 {
		font-size: clamp(2.6rem, 1.1rem + 4.4vw, 5.6rem);
		max-width: 10ch;
	}

	.c-card {
		display: grid;
		align-content: start;
		gap: 1.5rem;
		padding: 2rem var(--gutter) 2.5rem;
	}

	.c-hours {
		color: var(--on-orange-2);
	}

	.c-phones {
		margin: 0;
		border-top: 1px solid var(--line-orange);
	}

	.c-phone {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.7rem 0;
		border-bottom: 1px solid var(--line-orange);
		font-size: clamp(1.75rem, 1.3rem + 1.8vw, 2.6rem);
		font-weight: 600;
		line-height: 1;
		text-decoration: none;
		letter-spacing: 0.01em;
	}

	.c-phone:hover {
		text-decoration: underline;
		text-decoration-thickness: 2px;
	}

	.c-info {
		display: grid;
		gap: 1rem;
		margin: 0;
	}

	.c-info dt {
		color: var(--on-orange-2);
		margin-bottom: 0.15rem;
	}

	.c-info dd {
		font-weight: 500;
		overflow-wrap: anywhere;
	}

	.c-map {
		display: inline-block;
		margin-top: 0.25rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		font-size: 0.875rem;
	}

	.c-form {
		padding-block: var(--section);
	}

	@media (min-width: 64rem) {
		.c-hero {
			grid-template-columns: 7fr 5fr;
		}

		.c-title {
			padding: 10rem var(--gutter) 3.5rem;
		}

		.c-card {
			padding: 7.5rem var(--gutter) 3rem;
			clip-path: polygon(8rem 0, 100% 0, 100% 100%, 0 100%, 0 4.8rem);
		}
	}
</style>
