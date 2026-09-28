<script lang="ts">
	import { nav, site, primaryPhone } from '$lib/content/site';
	import { photos } from '$lib/content/photos';
	import LogoMark from './LogoMark.svelte';
	import Icon from './Icon.svelte';
	import Photo from './Photo.svelte';

	const year = new Date().getFullYear();
</script>

<section class="close on-dark" aria-labelledby="close-title">
	<Photo photo={photos.scaffoldBlock} class="close-photo" sizes="100vw" alt="" />
	<div class="close-shade" aria-hidden="true"></div>
	<span class="close-rule" aria-hidden="true"></span>

	<div class="close-grid frame">
		<p class="close-aside" data-reveal>
			Send us the lot, the plans, or the job site. We visit, measure, and quote to your budget.
		</p>
		<div class="close-main" data-reveal style:--i={1}>
			<h2 id="close-title" class="display h2">Start with a call, or a job order.</h2>
			<div class="close-actions">
				<a class="btn btn-lg" href="/contact">
					<span>Start a job order</span>
					<Icon name="arrow" class="arrow" />
				</a>
				<a class="btn btn-lg btn-paper" href="tel:{primaryPhone.tel}">
					<span>Call {primaryPhone.label}</span>
					<Icon name="phone" class="arrow" />
				</a>
			</div>
		</div>
	</div>
</section>

<footer class="footer on-orange">
	<div class="foot-grid frame">
		<div class="foot-left" data-reveal>
			<p class="foot-name">{site.legalName}</p>
			<address class="mono foot-address">
				{site.address.line1}<br />{site.address.line2}<br />{site.hours}
			</address>
			<a class="btn btn-ink btn-sm" href="/contact">
				<span>Get in touch</span>
				<Icon name="arrow" size={16} class="arrow" />
			</a>
			<LogoMark tone="ink" class="foot-mark" />
		</div>

		<div class="foot-right" data-reveal style:--i={1}>
			<nav aria-label="Footer">
				<ul role="list" class="foot-nav">
					<li><a href="/"><span>Home</span></a></li>
					{#each nav as item (item.href)}
						<li><a href={item.href}><span>{item.label}</span></a></li>
					{/each}
				</ul>
			</nav>

			<dl class="foot-contact">
				<div>
					<dt class="mono">Call or text</dt>
					<dd>
						{#each site.phones as p (p.tel)}
							<a href="tel:{p.tel}">{p.label}</a>
						{/each}
					</dd>
				</div>
				<div>
					<dt class="mono">Email</dt>
					<dd><a href="mailto:{site.email}">{site.email}</a></dd>
				</div>
				<div>
					<dt class="mono">Service area</dt>
					<dd>{site.serviceArea.join(', ')} and nearby Cebu towns</dd>
				</div>
			</dl>

			<div class="foot-legal mono">
				<span>© {year} SAS Construction · Cebu</span>
				{#if site.facebookUrl}
					<a href={site.facebookUrl} rel="noopener">Facebook</a>
				{/if}
			</div>
		</div>
	</div>
</footer>

<style>
	/* ── Closing band ───────────────────────────────── */
	.close {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		padding-block: var(--section) calc(var(--section) + 2rem);
	}

	.close :global(.close-photo) {
		position: absolute;
		inset: 0;
		z-index: -2;
	}

	.close-shade {
		position: absolute;
		inset: 0;
		z-index: -1;
		background:
			linear-gradient(90deg, rgb(28 27 25 / 0.92) 0%, rgb(28 27 25 / 0.72) 55%, rgb(28 27 25 / 0.5) 100%);
	}

	.close-rule {
		position: absolute;
		left: 0;
		right: 0;
		top: 34%;
		border-top: 1px solid var(--line-dark);
	}

	.close-grid {
		display: grid;
		gap: 3rem;
	}

	.close-aside {
		max-width: 26ch;
		font-size: var(--fs-lead);
		line-height: 1.3;
		text-transform: uppercase;
		font-weight: 500;
	}

	.close-main .h2 {
		max-width: 14ch;
	}

	.close-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 2rem;
	}

	/* ── Footer ─────────────────────────────────────── */
	.footer {
		position: relative;
		margin-top: -2.5rem;
		/* roof-pitch shoulder rising into the dark band */
		clip-path: polygon(0 0, 30% 0, calc(30% + 4.2rem) 2.5rem, 100% 2.5rem, 100% 100%, 0 100%);
		padding-top: 2.5rem;
	}

	.foot-grid {
		display: grid;
		gap: 3rem;
		padding-block: 3rem 1.5rem;
	}

	.foot-left {
		display: grid;
		align-content: start;
		justify-items: start;
		gap: 1.25rem;
	}

	.foot-name {
		max-width: 22ch;
		font-size: 1.25rem;
		font-weight: 500;
		line-height: 1.2;
		text-transform: uppercase;
	}

	.foot-address {
		font-style: normal;
		color: var(--on-orange-2);
	}

	.foot-left :global(.foot-mark) {
		width: min(20rem, 70%);
		margin-top: 2rem;
	}

	.foot-nav {
		margin: 0;
	}

	.foot-nav a {
		display: block;
		padding: 0.55rem 0 0.45rem;
		border-bottom: 1px solid var(--line-orange);
		font-size: clamp(1.4rem, 1.1rem + 1vw, 2rem);
		font-weight: 500;
		text-transform: uppercase;
		text-decoration: none;
		line-height: 1.1;
	}

	.foot-nav a span {
		display: inline-block;
		transition: translate 220ms var(--ease-out);
	}

	.foot-nav a:hover span {
		translate: 0.5rem 0;
	}

	.foot-contact {
		display: grid;
		gap: 1.25rem;
		margin-top: 2.5rem;
	}

	.foot-contact dt {
		color: var(--on-orange-2);
		margin-bottom: 0.2rem;
	}

	.foot-contact dd {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.25rem;
		font-size: 1.125rem;
		font-weight: 500;
		overflow-wrap: anywhere;
	}

	.foot-legal {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem 1.5rem;
		margin-top: 3rem;
		padding-top: 1rem;
		border-top: 1px solid var(--line-orange);
		color: var(--on-orange-2);
	}

	@media (min-width: 56rem) {
		.close-grid {
			grid-template-columns: 5fr 7fr;
			align-items: start;
		}

		.close-main {
			padding-top: 5rem;
		}

		.foot-grid {
			grid-template-columns: 5fr 7fr;
			column-gap: var(--gutter);
		}

		.foot-right {
			border-left: 1px solid var(--line-orange);
			padding-left: var(--gutter);
		}

		.foot-contact {
			display: flex;
			flex-wrap: wrap;
			gap: 1.25rem 3rem;
		}

		.foot-contact dd {
			overflow-wrap: normal;
		}

		.footer {
			clip-path: polygon(0 0, 38% 0, calc(38% + 4.2rem) 2.5rem, 100% 2.5rem, 100% 100%, 0 100%);
		}
	}
</style>
