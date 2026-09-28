<script lang="ts">
	import { onMount, tick } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import Icon from './Icon.svelte';
	import {
		emptyInquiry,
		validate,
		draftStamp,
		summaryRows,
		smsHref,
		mailtoHref,
		submitInquiry,
		locations,
		projectTypes,
		stages,
		type Errors,
		type Inquiry
	} from '$lib/inquiry';
	import { primaryPhone } from '$lib/content/site';

	let q = $state<Inquiry>(emptyInquiry());
	let attempted = $state(false);
	let status = $state<'editing' | 'sending' | 'ready'>('editing');
	let delivered = $state(false);
	let stamp = $state('Draft');

	// Errors show only after the first submit attempt, then update live.
	const errors: Errors = $derived(attempted ? validate(q) : {});
	const rows = $derived(summaryRows(q));
	const errorCount = $derived(Object.keys(errors).length);

	// Prefill from links like /contact?type=rent&item=… (browser only; pages are prerendered)
	onMount(() => {
		stamp = draftStamp();
		const p = new URLSearchParams(window.location.search);
		if (p.get('type') === 'rent') q.type = 'rent';
		const item = p.get('item');
		if (item) q.equipment = item;
		const project = p.get('project');
		if (project) {
			const match = projectTypes.find((t) => t.toLowerCase() === project.toLowerCase());
			if (match) q.project = match;
			else q.details = `Something like: ${project}\n`;
		}
	});

	const focusOnMount: Attachment<HTMLElement> = (node) => {
		node.focus();
	};

	async function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		attempted = true;
		const first = Object.keys(validate(q))[0];
		if (first) {
			await tick();
			document.getElementById(`f-${first}`)?.focus();
			return;
		}
		status = 'sending';
		const result = await submitInquiry($state.snapshot(q));
		delivered = result.delivered;
		status = 'ready';
	}

	function edit() {
		status = 'editing';
	}

	const describe = (key: keyof Inquiry, hint?: string) =>
		[hint ? `h-${key}` : '', errors[key] ? `e-${key}` : ''].filter(Boolean).join(' ') || undefined;
</script>

{#snippet slip(big = false)}
	<div class="slip" class:slip-big={big} aria-label="Job order summary">
		<div class="slip-head on-dark">
			<span class="slip-title">Job order</span>
			<span class="mono slip-no">{stamp}</span>
		</div>
		<dl class="slip-rows">
			{#each rows as [label, value] (label)}
				<div class="slip-row">
					<dt class="mono">{label}</dt>
					<dd class:empty={!value}>{value || '—'}</dd>
				</div>
			{/each}
		</dl>
		{#if q.details.trim()}
			<p class="slip-notes">{q.details.trim()}</p>
		{/if}
		<div class="slip-foot mono">SAS Construction · Cebu</div>
	</div>
{/snippet}

{#snippet err(key: keyof Inquiry)}
	{#if errors[key]}
		<p class="err" id="e-{key}">{errors[key]}</p>
	{/if}
{/snippet}

{#if status !== 'ready'}
	<form class="jo" novalidate {onsubmit} aria-describedby={attempted && errorCount ? 'form-errors' : undefined}>
		<div class="fields" data-reveal>
			<fieldset class="kind">
				<legend class="label">What do you need?</legend>
				<div class="kind-grid">
					<label class="kind-opt" class:on={q.type === 'build'}>
						<input type="radio" name="type" value="build" bind:group={q.type} />
						<span class="kind-name">Build or renovate</span>
						<span class="kind-sub">Houses, commercial, renovation, plans & permits</span>
					</label>
					<label class="kind-opt" class:on={q.type === 'rent'}>
						<input type="radio" name="type" value="rent" bind:group={q.type} />
						<span class="kind-name">Rent equipment</span>
						<span class="kind-sub">Machinery and tools for your site</span>
					</label>
				</div>
			</fieldset>

			<div class="row two">
				<div class="field">
					<label class="label" for="f-name">Your name</label>
					<input
						id="f-name"
						type="text"
						autocomplete="name"
						bind:value={q.name}
						aria-invalid={!!errors.name}
						aria-describedby={describe('name')}
					/>
					{@render err('name')}
				</div>
				<div class="field">
					<label class="label" for="f-mobile">Mobile number</label>
					<input
						id="f-mobile"
						type="tel"
						inputmode="tel"
						autocomplete="tel"
						placeholder="09XX XXX XXXX"
						bind:value={q.mobile}
						aria-invalid={!!errors.mobile}
						aria-describedby={describe('mobile')}
					/>
					{@render err('mobile')}
				</div>
			</div>

			<div class="row two">
				<div class="field">
					<label class="label" for="f-location">Where is the site?</label>
					<select
						id="f-location"
						bind:value={q.location}
						aria-invalid={!!errors.location}
						aria-describedby={describe('location')}
					>
						<option value="" disabled>Choose a location</option>
						{#each locations as l (l)}
							<option value={l}>{l}</option>
						{/each}
					</select>
					{@render err('location')}
				</div>
				{#if q.location === 'Other town in Cebu'}
					<div class="field">
						<label class="label" for="f-locationOther">Town or barangay</label>
						<input
							id="f-locationOther"
							type="text"
							bind:value={q.locationOther}
							aria-invalid={!!errors.locationOther}
							aria-describedby={describe('locationOther')}
						/>
						{@render err('locationOther')}
					</div>
				{:else}
					<div class="field">
						<label class="label" for="f-email">Email <span class="opt">optional</span></label>
						<input
							id="f-email"
							type="email"
							autocomplete="email"
							bind:value={q.email}
							aria-invalid={!!errors.email}
							aria-describedby={describe('email')}
						/>
						{@render err('email')}
					</div>
				{/if}
			</div>

			{#if q.type === 'build'}
				<div class="row two">
					<div class="field">
						<label class="label" for="f-project">Kind of project</label>
						<select
							id="f-project"
							bind:value={q.project}
							aria-invalid={!!errors.project}
							aria-describedby={describe('project')}
						>
							<option value="" disabled>Choose one</option>
							{#each projectTypes as t (t)}
								<option value={t}>{t}</option>
							{/each}
						</select>
						{@render err('project')}
					</div>
					<div class="field">
						<label class="label" for="f-budget">Budget <span class="opt">optional</span></label>
						<div class="peso">
							<span aria-hidden="true">₱</span>
							<input
								id="f-budget"
								type="text"
								inputmode="numeric"
								placeholder="e.g. 2,500,000"
								bind:value={q.budget}
								aria-describedby="h-budget"
							/>
						</div>
						<p class="hint" id="h-budget">A rough figure helps us plan the bill of materials.</p>
					</div>
				</div>

				<fieldset class="field">
					<legend class="label">Where are you now?</legend>
					<div class="chips">
						{#each stages as s (s)}
							<label class="chip" class:on={q.stage === s}>
								<input type="radio" name="stage" value={s} bind:group={q.stage} />
								<span>{s}</span>
							</label>
						{/each}
					</div>
				</fieldset>
			{:else}
				<div class="field">
					<label class="label" for="f-equipment">Equipment needed</label>
					<input
						id="f-equipment"
						type="text"
						placeholder="Machine or tool, and what the job is"
						bind:value={q.equipment}
						aria-invalid={!!errors.equipment}
						aria-describedby={describe('equipment')}
					/>
					{@render err('equipment')}
				</div>
				<div class="row two">
					<div class="field">
						<label class="label" for="f-startDate">Start date <span class="opt">optional</span></label>
						<input id="f-startDate" type="date" bind:value={q.startDate} />
					</div>
					<div class="field">
						<label class="label" for="f-days">Number of days <span class="opt">optional</span></label>
						<input
							id="f-days"
							type="text"
							inputmode="numeric"
							bind:value={q.days}
							aria-invalid={!!errors.days}
							aria-describedby={describe('days')}
						/>
						{@render err('days')}
					</div>
				</div>
			{/if}

			<div class="field">
				<label class="label" for="f-details">Anything else <span class="opt">optional</span></label>
				<textarea
					id="f-details"
					rows="4"
					placeholder={q.type === 'build'
						? 'Lot size, number of floors, what you want built or fixed'
						: 'Site access, operator needs, anything we should know'}
					bind:value={q.details}
				></textarea>
			</div>

			<fieldset class="field">
				<legend class="label">How should we reply?</legend>
				<div class="chips">
					{#each ['Call', 'Text'] as r (r)}
						<label class="chip" class:on={q.reply === r}>
							<input type="radio" name="reply" value={r} bind:group={q.reply} />
							<span>{r}</span>
						</label>
					{/each}
				</div>
			</fieldset>

			<div class="submit-row">
				{#if attempted && errorCount}
					<p class="err err-sum" id="form-errors" role="alert">
						{errorCount === 1 ? '1 field needs' : `${errorCount} fields need`} a fix before this job order is
						ready.
					</p>
				{/if}
				<button class="btn btn-lg" type="submit" disabled={status === 'sending'}>
					<span>{status === 'sending' ? 'Preparing…' : 'Review job order'}</span>
					<Icon name="arrow" class="arrow" />
				</button>
			</div>
		</div>

		<aside class="slip-col" aria-hidden="true" data-reveal="wipe" style:--i={1}>
			{@render slip()}
		</aside>
	</form>
{:else}
	<div class="done">
		<div class="done-copy" data-reveal>
			<h2 class="display h2" tabindex="-1" {@attach focusOnMount}>
				{delivered ? 'Job order sent.' : 'Job order ready.'}
			</h2>
			<p class="lead muted">
				{delivered
					? 'SAS has your details and will reply by ' + q.reply.toLowerCase() + '.'
					: 'Send it to SAS in one tap. Your details are already filled in.'}
			</p>
			{#if !delivered}
				<div class="done-actions">
					<a class="btn btn-lg" href={smsHref(q)}>
						<span>Send by text</span>
						<Icon name="sms" class="arrow" />
					</a>
					<a class="btn btn-lg btn-ink" href={mailtoHref(q)}>
						<span>Send by email</span>
						<Icon name="mail" class="arrow" />
					</a>
					<a class="btn btn-lg btn-paper done-call" href="tel:{primaryPhone.tel}">
						<span>Or call {primaryPhone.label}</span>
						<Icon name="phone" class="arrow" />
					</a>
				</div>
			{/if}
			<button class="edit" type="button" onclick={edit}>Edit job order</button>
		</div>
		{@render slip(true)}
	</div>
{/if}

<style>
	.jo {
		display: grid;
		gap: 3rem;
	}

	.fields {
		display: grid;
		gap: 1.5rem;
		min-width: 0;
	}

	fieldset {
		margin: 0;
		padding: 0;
		border: 0;
		min-width: 0;
	}

	.row {
		display: grid;
		gap: 1.5rem;
	}

	.field {
		display: grid;
		gap: 0.45rem;
		align-content: start;
	}

	.label {
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		padding: 0;
	}

	.opt {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		font-weight: 400;
		letter-spacing: 0.04em;
		color: var(--steel);
		margin-left: 0.35rem;
	}

	input[type='text'],
	input[type='tel'],
	input[type='email'],
	input[type='date'],
	select,
	textarea {
		width: 100%;
		min-height: 3.1rem;
		padding: 0.7rem 0.85rem;
		background: #fbfbf8;
		border: 1px solid var(--line-strong);
		border-bottom: 2px solid var(--ink);
		border-radius: 0;
		font-size: 1.0625rem;
		transition:
			border-color 160ms var(--ease-out),
			background-color 160ms var(--ease-out);
	}

	select {
		appearance: none;
		background-image:
			linear-gradient(45deg, transparent 50%, var(--ink) 50%),
			linear-gradient(135deg, var(--ink) 50%, transparent 50%);
		background-position:
			calc(100% - 1.2rem) 55%,
			calc(100% - 0.85rem) 55%;
		background-size: 0.36rem 0.36rem;
		background-repeat: no-repeat;
		padding-right: 2.5rem;
	}

	textarea {
		resize: vertical;
		line-height: 1.5;
	}

	::placeholder {
		color: #6a6862; /* 5.3:1 on the field */
	}

	input:hover,
	select:hover,
	textarea:hover {
		background-color: #fff;
	}

	input:focus-visible,
	select:focus-visible,
	textarea:focus-visible {
		outline: 2px solid var(--orange);
		outline-offset: 0;
		background-color: #fff;
	}

	[aria-invalid='true'] {
		border-color: #b3261e;
		border-bottom-color: #b3261e;
	}

	.err {
		color: #9c1f18;
		font-size: 0.9375rem;
		font-weight: 500;
	}

	.hint {
		color: var(--steel);
		font-size: 0.875rem;
	}

	.peso {
		position: relative;
	}

	.peso span {
		position: absolute;
		left: 0.85rem;
		top: 50%;
		translate: 0 -50%;
		font-weight: 600;
	}

	.peso input {
		padding-left: 2rem;
	}

	/* Build / Rent selector */
	.kind-grid {
		display: grid;
		gap: 0.4rem;
		margin-top: 0.6rem;
	}

	.kind-opt {
		position: relative;
		display: grid;
		gap: 0.3rem;
		padding: 1rem 1.1rem 1.05rem;
		background: var(--paper-2);
		cursor: pointer;
		clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
		transition: background-color 180ms var(--ease-out);
	}

	.kind-opt:hover {
		background: var(--concrete);
	}

	.kind-opt.on {
		background: var(--orange);
	}

	.kind-opt input,
	.chip input {
		position: absolute;
		opacity: 0;
		width: 1px;
		height: 1px;
	}

	.kind-opt:has(input:focus-visible),
	.chip:has(input:focus-visible) {
		outline: 2px solid var(--ink);
		outline-offset: -5px;
	}

	.kind-name {
		font-size: 1.3rem;
		font-weight: 500;
		line-height: 1.05;
		text-transform: uppercase;
	}

	.kind-sub {
		font-size: 0.9375rem;
		color: var(--steel);
	}

	.kind-opt.on .kind-sub {
		color: var(--on-orange-2);
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-top: 0.45rem;
	}

	.chip {
		position: relative;
		display: inline-flex;
		align-items: center;
		min-height: 2.75rem;
		padding: 0.5rem 0.95rem;
		border: 1px solid var(--line-strong);
		font-weight: 500;
		cursor: pointer;
		transition:
			background-color 160ms var(--ease-out),
			border-color 160ms var(--ease-out);
	}

	.chip:hover {
		background: var(--paper-2);
	}

	.chip.on {
		background: var(--ink);
		border-color: var(--ink);
		color: var(--paper);
	}

	.chip.on:has(input:focus-visible) {
		outline-color: var(--orange);
	}

	.submit-row {
		display: grid;
		justify-items: start;
		gap: 1rem;
		padding-top: 0.5rem;
	}

	.submit-row .btn {
		min-width: min(100%, 18rem);
	}

	.btn[disabled] {
		opacity: 0.6;
		cursor: progress;
	}

	/* Slip */
	.slip-col {
		display: none;
	}

	.slip {
		background: #fbfbf8;
		border: 1px solid var(--line-strong);
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%);
	}

	.slip-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.8rem 1rem;
	}

	.slip-title {
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.slip-no {
		color: var(--orange);
	}

	.slip-rows {
		margin: 0;
		padding: 0.4rem 1rem;
	}

	.slip-row {
		display: grid;
		grid-template-columns: 6.5rem 1fr;
		gap: 0.75rem;
		padding: 0.55rem 0;
		border-bottom: 1px dashed var(--line-strong);
	}

	.slip-row dt {
		color: var(--steel);
		padding-top: 0.15rem;
	}

	.slip-row dd {
		font-weight: 500;
		overflow-wrap: anywhere;
	}

	.slip-row dd.empty {
		color: #a3a19a;
	}

	.slip-notes {
		margin: 0 1rem;
		padding: 0.6rem 0;
		white-space: pre-line;
		color: var(--steel);
		font-size: 0.9375rem;
		border-bottom: 1px dashed var(--line-strong);
	}

	.slip-foot {
		padding: 0.8rem 1rem 1.2rem;
		color: var(--steel);
	}

	/* Done */
	.done {
		display: grid;
		gap: 2.5rem;
		align-items: start;
	}

	.done-copy {
		display: grid;
		justify-items: start;
		gap: 1.25rem;
	}

	.done-copy h2:focus {
		outline: none;
	}

	.done-actions {
		display: grid;
		gap: 0.4rem;
		width: min(100%, 24rem);
	}

	.edit {
		padding: 0.4rem 0;
		background: none;
		border: 0;
		border-bottom: 1px solid currentColor;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		cursor: pointer;
	}

	@media (min-width: 40rem) {
		.row.two {
			grid-template-columns: 1fr 1fr;
		}

		.kind-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (min-width: 64rem) {
		.jo {
			grid-template-columns: minmax(0, 7fr) minmax(20rem, 4fr);
			gap: clamp(2rem, 1rem + 3vw, 5rem);
			align-items: start;
		}

		.slip-col {
			display: block;
			position: sticky;
			top: 1.5rem;
		}

		.done {
			grid-template-columns: minmax(0, 7fr) minmax(20rem, 4fr);
			gap: clamp(2rem, 1rem + 3vw, 5rem);
		}
	}
</style>
