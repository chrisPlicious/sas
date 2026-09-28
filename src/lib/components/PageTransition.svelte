<script lang="ts">
	// Page transition, ported from Claude Design "Arrow Transition" (arrow-transition.jsx).
	// On a client-side route change the SAS arrow peeks up from the bottom edge,
	// dips, then shoots up the screen dragging a paper page behind it. The route
	// swaps while that paper covers the viewport (onNavigate holds SvelteKit until
	// then), and the paper lifts off the new page as it settles into place.
	// Reduced-motion visitors get instant routes; it stands down while the entry
	// loader is up. The overlay is a manual popover so it also covers the menu dialog.
	import { onNavigate } from '$app/navigation';
	import type { OnNavigate } from '@sveltejs/kit';

	// ── Timeline (from OM_SCENES, retimed for navigation) ─────────────────
	// Authored as a 2.8s showcase loop: Idle 0.7 · Sweep 1.2 · Settle 0.9.
	// A click has to answer faster, so the beats keep their order and eases
	// but play in 1.45s.
	const PEEK_END = 0.26; // tip rises into view
	const DIP_END = 0.36; // anticipation: the tip dips before the sweep
	const LIFT_START = 0.44; // outgoing page starts lifting away
	const SWEEP_END = 1.0; // arrow has cleared the top edge
	const SETTLE_END = 1.45; // paper has lifted off the new page
	const FAILSAFE_MS = 4000; // release the page if frames stall

	// ── Geometry (design stage is 1920×1080; distances scale with viewport height) ─
	const PEEK = 110 / 1080;
	const DIP = 30 / 1080;
	const LIFT = 120 / 1080;
	const RISE = 30 / 1080;
	const CLEAR = 52 / 1080; // chevron clears the top edge by this much
	const STRETCH = 0.14;
	// Arrow units (600 wide). The chevron is 315 tall; its outer shoulders
	// bottom out at y=210, so once they pass the top edge the arrow and its
	// paper cover the whole viewport.
	const CHEVRON = 315;
	const SHOULDER = 210;
	const ARROW = 'M0,315 L0,210 Q0,180 25,165 L272,17 Q300,0 328,17 L575,165 Q600,180 600,210 L600,315 L300,135 Z';

	// ── Motion helpers (Easing + animate from animations-v3.jsx) ──────────
	type Ease = (t: number) => number;
	const easeOutCubic: Ease = (t) => --t * t * t + 1;
	const easeInOutCubic: Ease = (t) =>
		t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	const easeOutQuart: Ease = (t) => 1 - (t - 1) ** 4;
	const tween = (ease: Ease) => (from: number, to: number, start: number, end: number, t: number) => {
		if (t <= start) return from;
		if (t >= end) return to;
		return from + (to - from) * ease((t - start) / (end - start));
	};
	const enter = tween(easeOutCubic);
	const sweep = tween(easeInOutCubic);
	const settle = tween(easeOutQuart);

	let active = $state(false);
	let t = $state(0);
	let vw = $state(0);
	let vh = $state(0);

	const v = $derived.by(() => {
		const s = vw / 600;
		const p = sweep(0, 1, DIP_END, SWEEP_END, t);
		const yStart = vh * (1 - PEEK + DIP);
		const yEnd = -(CHEVRON * s + vh * CLEAR);
		const y =
			t < DIP_END
				? enter(vh, vh * (1 - PEEK), 0, PEEK_END, t) + settle(0, vh * DIP, PEEK_END, DIP_END, t)
				: yStart + (yEnd - yStart) * p;
		const stretch = 1 + STRETCH * Math.sin(Math.PI * p);
		return {
			y,
			stretch,
			covered: y + SHOULDER * s * stretch <= 0,
			paperO: 1 - settle(0, 1, SWEEP_END, SETTLE_END, t)
		};
	});

	// ── Run state (not rendered) ───────────────────────────────────────────
	let raf = 0;
	let failsafe = 0;
	let t0 = 0;
	let covered = false; // paper covers the viewport: the route may swap
	let ready = false; // the latest navigation has rendered
	let latest: Promise<void> | undefined;
	let waiting: Array<() => void> = [];
	let lifts = false; // outgoing page moves (only when the overlay sits in the top layer)

	function shouldPlay({ from, to }: OnNavigate) {
		if (!from || !to || from.url.pathname === to.url.pathname) return false;
		if (document.hidden || document.documentElement.classList.contains('sas-intro')) return false;
		return !matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

	function start() {
		cancelAnimationFrame(raf);
		clearTimeout(failsafe);
		vw = document.documentElement.clientWidth;
		vh = window.innerHeight;
		covered = false;
		t = 0;
		active = true;
		document.documentElement.classList.add('pt-run');
		t0 = performance.now();
		raf = requestAnimationFrame(frame);
		failsafe = window.setTimeout(finish, FAILSAFE_MS);
	}

	function cover() {
		covered = true;
		document.documentElement.classList.add('pt-cover');
		waiting.forEach((release) => release());
		waiting = [];
	}

	// The outgoing page lifts under the sweep; the new one rises into place as
	// the paper fades. The jump between them happens while the paper covers it.
	function shift(time: number) {
		if (!lifts) return;
		const dy = covered
			? settle(vh * RISE, 0, SWEEP_END, SETTLE_END, time)
			: sweep(0, -vh * LIFT, LIFT_START, SWEEP_END, time);
		document.body.style.translate = dy ? `0 ${dy}px` : '';
	}

	function frame(now: number) {
		let time = Math.max(0, (now - t0) / 1000);
		// Hold on the paper until the new route has rendered.
		if (time >= SWEEP_END && !ready) {
			t0 = now - SWEEP_END * 1000;
			time = SWEEP_END;
		}
		t = time;
		if (!covered && (v.covered || time >= SWEEP_END)) cover();
		// Paper starts lifting: let the new page's entrances and reveals play.
		const root = document.documentElement;
		if (time > SWEEP_END && root.classList.contains('pt-cover')) root.classList.remove('pt-cover');
		shift(time);
		if (time >= SETTLE_END) return finish();
		raf = requestAnimationFrame(frame);
	}

	function finish() {
		cancelAnimationFrame(raf);
		clearTimeout(failsafe);
		if (!covered) cover();
		document.documentElement.classList.remove('pt-run', 'pt-cover');
		document.body.style.translate = '';
		active = false;
		t = 0;
	}

	onNavigate((navigation) => {
		if (!shouldPlay(navigation)) return;

		// Only the newest navigation's render ends the hold.
		const done = navigation.complete;
		latest = done;
		ready = false;
		const release = () => {
			if (latest === done) ready = true;
		};
		done.then(release, release);

		// Idle, or the paper is already lifting off: send a fresh arrow.
		// Otherwise the running sweep carries this navigation too.
		if (!active || t > SWEEP_END) start();
		if (covered) return;
		return new Promise<void>((resolve) => waiting.push(resolve));
	});

	const show = (node: HTMLElement) => {
		if (!('showPopover' in node)) return;
		node.showPopover();
		lifts = true;
		return () => (lifts = false);
	};
</script>

{#if active}
	<div class="pt" popover="manual" aria-hidden="true" {@attach show}>
		<div class="pt-arrow" style:transform="translate3d(0, {v.y}px, 0) scaleY({v.stretch})" style:opacity={v.paperO}>
			<svg viewBox="0 0 600 316">
				<defs>
					<linearGradient id="ptL" x1="0" y1="1" x2="1" y2="0">
						<stop offset="0" stop-color="#F28A1C" />
						<stop offset="1" stop-color="#F89A25" />
					</linearGradient>
					<linearGradient id="ptR" x1="300" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
						<stop offset="0" stop-color="#DC6C1A" />
						<stop offset="1" stop-color="#F2911F" />
					</linearGradient>
					<clipPath id="ptRight"><rect x="300" y="-10" width="310" height="340" /></clipPath>
				</defs>
				<path class="paper" d="M0,312 L300,132 L600,312 L600,316 L0,316 Z" />
				<path d={ARROW} fill="url(#ptL)" />
				<path d={ARROW} fill="url(#ptR)" clip-path="url(#ptRight)" />
			</svg>
			<div class="pt-paper" style:height="{vh * 1.25}px"></div>
		</div>
	</div>
{/if}

<style>
	/* Reset the UA popover box to a full-viewport, see-through stage. */
	.pt {
		position: fixed;
		inset: 0;
		z-index: 900;
		width: 100%;
		height: 100%;
		max-width: none;
		max-height: none;
		margin: 0;
		padding: 0;
		border: 0;
		background: none;
		overflow: hidden;
		pointer-events: none;
	}

	.pt-arrow {
		position: absolute;
		inset: 0 0 auto;
		transform-origin: 50% 0;
		will-change: transform, opacity;
	}

	svg {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 600 / 316;
		pointer-events: none;
	}

	/* The arrow and its paper swallow clicks; the air around the tip doesn't. */
	path {
		pointer-events: visiblePainted;
	}

	.paper {
		fill: var(--paper);
	}

	.pt-paper {
		margin-top: -1px;
		background: var(--paper);
		pointer-events: auto;
	}
</style>
