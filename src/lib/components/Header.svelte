<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { nav, primaryPhone, site } from '$lib/content/site';
	import LogoMark from './LogoMark.svelte';
	import Icon from './Icon.svelte';

	let menu: HTMLDialogElement | undefined;

	const registerMenu = (node: HTMLDialogElement) => {
		menu = node;
		return () => (menu = undefined);
	};

	const isCurrent = (href: string) =>
		page.url.pathname === href || page.url.pathname.startsWith(href + '/');

	function openMenu() {
		menu?.showModal();
	}

	function closeMenu() {
		menu?.close();
	}

	afterNavigate(() => closeMenu());
</script>

<header class="header">
	<a class="brand" href="/" aria-label="SAS Construction, home">
		<LogoMark class="brand-mark" />
		<span class="brand-words">
			<span class="brand-sas">SAS</span>
			<span class="brand-sub">Construction</span>
		</span>
	</a>

	<nav class="nav" aria-label="Main">
		<ul role="list">
			{#each nav as item (item.href)}
				<li>
					<a class="nav-link" href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined}>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="actions">
		<a class="btn btn-paper btn-sm call" href="tel:{primaryPhone.tel}">
			<span><span class="call-label">Call</span> {primaryPhone.label}</span>
			<Icon name="phone" size={16} class="arrow" />
		</a>
		<button class="btn btn-sm menu-btn" type="button" onclick={openMenu} aria-haspopup="dialog">
			<span>Menu</span>
			<Icon name="menu" size={18} />
		</button>
	</div>
</header>

<dialog class="menu on-orange" {@attach registerMenu} aria-label="Site menu">
	<div class="menu-top">
		<a class="menu-brand" href="/" aria-label="SAS Construction, home">
			<LogoMark tone="ink" class="menu-mark" />
		</a>
		<button class="btn btn-ink btn-sm" type="button" onclick={closeMenu}>
			<span>Close</span>
			<Icon name="close" size={18} />
		</button>
	</div>

	<nav aria-label="Menu">
		<ul role="list" class="menu-list">
			<li><a href="/" aria-current={page.url.pathname === '/' ? 'page' : undefined}>Home</a></li>
			{#each nav as item (item.href)}
				<li>
					<a href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined}>{item.label}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="menu-foot">
		{#each site.phones as p (p.tel)}
			<a class="btn btn-ink" href="tel:{p.tel}">
				<span>Call {p.label}</span>
				<Icon name="phone" size={18} class="arrow" />
			</a>
		{/each}
		<p class="mono">{site.hours} · {site.address.line2}</p>
	</div>
</dialog>

<style>
	.header {
		position: absolute;
		inset: 0 0 auto;
		z-index: 20;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		padding: 0 var(--gutter);
		pointer-events: none;
	}

	.header > * {
		pointer-events: auto;
	}

	/* Logo sits on a paper plate like a site signboard */
	.brand {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		padding: 0.85rem 1.1rem 0.85rem 0.9rem;
		background: var(--paper);
		text-decoration: none;
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%);
	}

	.brand :global(.brand-mark) {
		width: 3rem;
		height: auto;
	}

	.brand-words {
		display: grid;
		line-height: 1;
	}

	.brand-sas {
		font-weight: 700;
		font-size: 1.45rem;
		letter-spacing: 0.2em;
		margin-right: -0.2em;
	}

	.brand-sub {
		font-family: var(--font-mono);
		font-size: 0.625rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		margin-top: 0.3rem;
	}

	.brand:focus-visible {
		outline-offset: -5px;
	}

	.nav {
		display: none;
		margin-top: 1rem;
		margin-left: auto;
	}

	.nav ul {
		display: flex;
		gap: 2px;
		margin: 0;
	}

	.nav-link {
		display: block;
		padding: 0.55rem 0.85rem;
		background: var(--paper);
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: none;
		transition: background-color 160ms var(--ease-out);
	}

	.nav-link:hover {
		background: #fff;
	}

	.nav-link[aria-current='page'] {
		background: var(--ink);
		color: var(--paper);
	}

	.nav-link:focus-visible {
		outline-offset: -4px;
	}

	.nav-link[aria-current='page']:focus-visible {
		outline-color: var(--orange);
	}

	.actions {
		display: flex;
		gap: 0.4rem;
		margin-top: 1rem;
	}

	.call {
		display: none;
	}

	.call-label {
		font-weight: 500;
	}

	/* Menu dialog */
	.menu {
		width: 100%;
		max-width: none;
		height: 100%;
		max-height: none;
		margin: 0;
		padding: 1rem var(--gutter) 2rem;
		border: 0;
		display: none;
		flex-direction: column;
		gap: 2rem;
	}

	.menu[open] {
		display: flex;
		animation: menu-in 420ms var(--ease-out) both;
	}

	.menu::backdrop {
		background: rgb(28 27 25 / 0.5);
	}

	@keyframes menu-in {
		from {
			clip-path: polygon(100% 0, 100% 0, 100% 0, 100% 0);
		}
		to {
			clip-path: polygon(-60% 0, 100% 0, 100% 100%, -60% 100%);
		}
	}

	.menu-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.menu-top :global(.menu-mark) {
		width: 4.5rem;
	}

	.menu-list {
		margin: 0;
		border-top: 1px solid var(--line-orange);
	}

	.menu-list a {
		display: block;
		padding: 0.7rem 0 0.6rem;
		border-bottom: 1px solid var(--line-orange);
		font-size: clamp(2.2rem, 8vw, 4rem);
		font-weight: 500;
		line-height: 1;
		text-transform: uppercase;
		text-decoration: none;
	}

	.menu-list a[aria-current='page'] {
		text-decoration: underline;
		text-decoration-thickness: 3px;
		text-underline-offset: 0.12em;
	}

	.menu-foot {
		margin-top: auto;
		display: grid;
		gap: 0.5rem;
		max-width: 26rem;
	}

	.menu-foot .mono {
		margin-top: 0.75rem;
		color: var(--on-orange-2);
	}

	@media (min-width: 40rem) {
		.call {
			display: inline-flex;
		}
	}

	@media (min-width: 64rem) {
		.nav {
			display: block;
		}

		.menu-btn {
			display: none;
		}

		.header {
			gap: 0.4rem;
		}

		/* signboard scale: the mark leads the corner like the board's monogram */
		.brand {
			gap: 0.9rem;
			padding: 1.1rem 1.4rem 1.1rem 1.1rem;
		}

		.brand :global(.brand-mark) {
			width: 6rem;
		}

		.brand-sas {
			font-size: 2rem;
		}

		.brand-sub {
			font-size: 0.6875rem;
		}
	}
</style>
