<script lang="ts">
	import { process } from '$lib/content/services';
	import Photo from './Photo.svelte';
	import Icon from './Icon.svelte';

	let open = $state(0);

	function toggle(i: number) {
		open = open === i ? -1 : i;
	}
</script>

<ol class="steps" role="list" data-reveal style:--i={1}>
	{#each process as step, i (step.title)}
		{@const isOpen = open === i}
		<li class="step" class:is-open={isOpen}>
			<h3>
				<button
					type="button"
					class="head"
					aria-expanded={isOpen}
					aria-controls="step-panel-{i}"
					id="step-head-{i}"
					onclick={() => toggle(i)}
				>
					<span class="num" aria-hidden="true">{i + 1}</span>
					<span class="name">{step.title}</span>
					<Icon name={isOpen ? 'minus' : 'plus'} size={20} class="sign" />
				</button>
			</h3>
			<div class="panel" id="step-panel-{i}" role="region" aria-labelledby="step-head-{i}" hidden={!isOpen}>
				<div class="panel-inner">
					<p class="body">{step.body}</p>
					<div class="thumb">
						<Photo photo={step.photo} sizes="(min-width: 64rem) 16rem, 40vw" />
					</div>
				</div>
			</div>
		</li>
	{/each}
</ol>

<style>
	.steps {
		margin: 0;
		border-top: 1px solid var(--line-strong);
	}

	.step {
		border-bottom: 1px solid var(--line-strong);
	}

	h3 {
		font: inherit;
	}

	.head {
		display: grid;
		grid-template-columns: 2.25ch 1fr auto;
		grid-template-areas: 'num name sign';
		column-gap: 0.75rem;
		align-items: baseline;
		width: 100%;
		padding: 1.1rem 0 1rem;
		background: none;
		border: 0;
		text-align: left;
		cursor: pointer;
	}

	.head:focus-visible {
		outline-offset: -2px;
	}

	.num,
	.name {
		font-size: clamp(1.2rem, 1rem + 0.7vw, 1.6rem);
		font-weight: 500;
		line-height: 1.1;
		text-transform: uppercase;
	}

	.num {
		grid-area: num;
		color: var(--steel);
		font-variant-numeric: tabular-nums;
	}

	.step.is-open .num {
		color: var(--orange-deep);
	}

	.name {
		grid-area: name;
	}

	.head :global(.sign) {
		grid-area: sign;
		align-self: center;
		transition: rotate 300ms var(--ease-out);
	}

	.head:hover .name {
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.18em;
	}

	.panel-inner {
		display: grid;
		gap: 1.25rem;
		padding: 0 0 1.5rem calc(2.25ch + 0.75rem);
		animation: open 500ms var(--ease-out) both;
	}

	@keyframes open {
		from {
			opacity: 0;
			clip-path: inset(0 0 100% 0);
		}
		to {
			opacity: 1;
			clip-path: inset(0 0 0 0);
		}
	}

	.body {
		color: var(--steel);
		max-width: 40ch;
	}

	.thumb {
		aspect-ratio: 4 / 3;
		width: min(100%, 16rem);
		overflow: hidden;
		clip-path: polygon(0 0, 100% 0, 100% 100%, 22px 100%, 0 calc(100% - 22px));
	}

	@media (min-width: 40rem) {
		.panel-inner {
			grid-template-columns: 1fr 14rem;
			align-items: start;
		}

		.thumb {
			width: 100%;
		}
	}
</style>
