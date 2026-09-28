<script lang="ts">
	// Entry loader, ported from Claude Design "SAS Loader" (sas-loader.jsx).
	// Plays once per browser session on the first page a visitor lands on.
	// Never runs on client-side navigation: the root layout mounts it once.
	// Whether it plays is decided before first paint by the inline script in
	// src/app.html (adds `html.sas-intro`); reduced-motion visitors never see it.
	import '@fontsource/archivo/latin-400.css';
	import '@fontsource/archivo/latin-800.css';
	import { onMount } from 'svelte';

	// ── Timeline (from OM_SCENES) ─────────────────────────────────────────
	// Blueprint 1.5 · Hoist 1.6 · Build 0.9 · Type 1.1 · Hold 1.3 · Reset 0.7 (authored 0.6)
	const CUES = { Blueprint: 0, Hoist: 1.5, Build: 3.1, Type: 4.0, Hold: 5.1, Reset: 6.4 };
	const RESET_PLAY = 0.7;
	const RESET_AUTHORED = 0.6;
	// Overlay fades after the logo has lifted out (play-time seconds).
	const EXIT_START = CUES.Reset + 0.45;
	const EXIT_END = EXIT_START + 0.5;

	// ── Motion helpers (Easing + animate from animations-v3.jsx) ──────────
	type Ease = (t: number) => number;
	const easeOutCubic: Ease = (t) => --t * t * t + 1;
	const easeInOutCubic: Ease = (t) =>
		t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	const easeOutBack: Ease = (t) => {
		const c1 = 1.70158;
		const c3 = c1 + 1;
		return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
	};
	const tween = (ease: Ease) => (from: number, to: number, start: number, end: number, t: number) => {
		if (t <= start) return from;
		if (t >= end) return to;
		return from + (to - from) * ease((t - start) / (end - start));
	};
	const enter = tween(easeOutCubic);
	const pop = tween(easeOutBack);
	const draw = tween(easeInOutCubic);
	const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

	// Play time → authored time (only Reset is retimed: 0.6 authored over 0.7 played)
	const authored = (p: number) =>
		p < CUES.Reset ? p : CUES.Reset + Math.min(p - CUES.Reset, RESET_PLAY) * (RESET_AUTHORED / RESET_PLAY);

	// ── Artwork constants ──────────────────────────────────────────────────
	const ORANGE_L = '#F7920F';
	const ORANGE_R = '#EA870A';
	const ORANGE_IN = '#F39200';
	const ROOF = '157,232 267,163 377,232 377,285 267,212 157,288';
	const INNER = '227,262 267,237 307,262 307,280 267,256 227,280';
	const FONT = 'Archivo, sans-serif';
	const LINE = '#EFEAE3';
	const DIM = '#8C857D';
	const STEEL = '#2B2622';
	const INK = '#111111';
	const TRACK = '#EEEAE4';
	const crosses = [
		[157, 288],
		[377, 285],
		[267, 163]
	];
	const letters = [
		{ c: 'S', x: 220 },
		{ c: 'A', x: 267 },
		{ c: 'S', x: 314 }
	];

	let playTime = $state(0);
	let active = $state(false);

	const v = $derived.by(() => {
		const T = authored(playTime);
		const b0 = CUES.Blueprint;
		const bd = CUES.Build;
		const h = CUES.Hoist;

		// Blueprint
		const dimW = enter(0, 1, b0 + 0.7, b0 + 1.3, T);
		const dimH = enter(0, 1, b0 + 0.85, b0 + 1.45, T);
		const dimO = 1 - enter(0, 1, h + 1.2, bd + 0.2, T);
		const lineO = 1 - enter(0, 1, bd + 0.3, bd + 0.8, T);

		// Hoist
		const drop = enter(-280, 0, h, h + 0.8, T);
		const ts = T - (h + 0.35);
		const swing = ts > 0 ? 7 * Math.exp(-3.2 * ts) * Math.sin(9 * ts) : 0;
		const slingO = 1 - enter(0, 1, h + 1.05, h + 1.25, T);
		const lift = draw(0, -320, h + 1.1, h + 1.6, T);

		// Build
		const slide = pop(1, 0, bd, bd + 0.7, T);

		// Piece
		const out = enter(0, 1, CUES.Reset, CUES.Reset + 0.5, T);
		const breathe =
			1 + 0.012 * Math.sin(clamp((T - CUES.Hold) / (CUES.Reset - CUES.Hold), 0, 1) * Math.PI);

		return {
			gridO: enter(0, 1, b0, b0 + 0.6, T) * (1 - enter(0, 1, bd + 0.2, CUES.Type + 0.4, T)),
			roofDraw: draw(0, 1, b0 + 0.2, b0 + 1.2, T),
			innerDraw: draw(0, 1, b0 + 0.6, b0 + 1.4, T),
			lineO,
			dimW,
			dimH,
			dimO,
			labelO: enter(0, 1, b0 + 1.1, b0 + 1.45, T) * dimO,
			mark: pop(0, 1, b0 + 0.15, b0 + 0.55, T) * lineO,
			hw: 110 * dimW,
			hh: 62.5 * dimH,
			drop,
			swing: swing * slingO,
			slingO,
			loadO: enter(0, 1, h, h + 0.15, T),
			// Tall phone screens show more sky than the 16:9 design stage, so the
			// rig fades as it lifts instead of parking visibly above the logo.
			rigO: 1 - enter(0, 1, h + 1.3, h + 1.6, T),
			hy: 222 + drop + lift,
			slide,
			roofO: enter(0, 1, bd, bd + 0.3, T),
			letters: letters.map((l, i) => {
				const s = CUES.Type + i * 0.12;
				return { ...l, y: pop(22, 0, s, s + 0.5, T), o: enter(0, 1, s, s + 0.3, T) };
			}),
			track: draw(14, 3.2, CUES.Type + 0.3, CUES.Type + 1.0, T),
			subO: enter(0, 1, CUES.Type + 0.3, CUES.Type + 0.8, T),
			fill: draw(0, 1, 0, CUES.Reset, T),
			out,
			breathe,
			overlayO: 1 - enter(0, 1, EXIT_START, EXIT_END, playTime)
		};
	});

	onMount(() => {
		const root = document.documentElement;
		if (!root.classList.contains('sas-intro')) return;

		try {
			sessionStorage.setItem('sas-intro-seen', '1');
		} catch {
			// private mode: the loader simply plays again next visit
		}

		active = true;
		let offset = 0;
		let raf = 0;
		const t0 = performance.now();

		const finish = () => {
			cancelAnimationFrame(raf);
			root.classList.remove('sas-intro');
			active = false;
			removeEventListener('pointerdown', skip);
			removeEventListener('keydown', skip);
		};

		// Any tap or key jumps to the Reset scene so the logo still exits cleanly.
		function skip() {
			if (playTime < CUES.Reset) offset += CUES.Reset - playTime;
		}

		const frame = (now: number) => {
			playTime = (now - t0) / 1000 + offset;
			if (playTime >= EXIT_END) return finish();
			raf = requestAnimationFrame(frame);
		};

		addEventListener('pointerdown', skip);
		addEventListener('keydown', skip);
		raf = requestAnimationFrame(frame);

		return finish;
	});
</script>

<div class="sas-loader" class:done={!active && playTime > 0} style:opacity={v.overlayO} aria-hidden="true">
	<svg
		viewBox="140 150 255 250"
		style:opacity={1 - v.out}
		style:transform="translateY({-24 * v.out}px) scale({v.breathe})"
	>
		<!-- Blueprint -->
		<defs>
			<pattern id="sasGrid" width="10" height="10" patternUnits="userSpaceOnUse" x="7" y="3">
				<path d="M10 0H0V10" fill="none" stroke={LINE} stroke-width="0.4" />
			</pattern>
			<radialGradient id="sasFade">
				<stop offset="0" stop-color="#fff" />
				<stop offset="1" stop-color="#fff" stop-opacity="0" />
			</radialGradient>
			<mask id="sasMask">
				<rect x="-60" y="30" width="655" height="490" fill="url(#sasFade)" />
			</mask>
			<clipPath id="sasL"><rect x="100" y="100" width="167" height="250" /></clipPath>
			<clipPath id="sasR"><rect x="267" y="100" width="167" height="250" /></clipPath>
		</defs>

		<rect x="-60" y="30" width="655" height="490" fill="url(#sasGrid)" mask="url(#sasMask)" opacity={v.gridO} />
		<g fill="none" stroke={ORANGE_L} stroke-width="0.9" stroke-linejoin="round" opacity={v.lineO}>
			<polygon points={ROOF} pathLength="1" stroke-dasharray="1" stroke-dashoffset={1 - v.roofDraw} />
			<polygon points={INNER} pathLength="1" stroke-dasharray="1" stroke-dashoffset={1 - v.innerDraw} />
		</g>
		<g opacity={v.dimO}>
			<line x1={267 - v.hw} y1="306" x2={267 + v.hw} y2="306" stroke={DIM} stroke-width="0.5" />
			{#if v.dimW > 0.01}
				<line x1={267 - v.hw} y1="303" x2={267 - v.hw} y2="309" stroke={DIM} stroke-width="0.6" />
				<line x1={267 + v.hw} y1="303" x2={267 + v.hw} y2="309" stroke={DIM} stroke-width="0.6" />
			{/if}
			<line x1="395" y1={225.5 - v.hh} x2="395" y2={225.5 + v.hh} stroke={DIM} stroke-width="0.5" />
			{#if v.dimH > 0.01}
				<line x1="392" y1={225.5 - v.hh} x2="398" y2={225.5 - v.hh} stroke={DIM} stroke-width="0.6" />
				<line x1="392" y1={225.5 + v.hh} x2="398" y2={225.5 + v.hh} stroke={DIM} stroke-width="0.6" />
			{/if}
			<g fill={DIM} opacity={v.labelO} style:font="500 6px {FONT}" style:letter-spacing="0.6px">
				<text x="267" y="316" text-anchor="middle">22.0 M</text>
				<text x="402" y="227" transform="rotate(90 402 227)" text-anchor="middle">12.5 M</text>
			</g>
		</g>
		{#each crosses as [x, y] (`${x},${y}`)}
			<g transform="translate({x} {y}) scale({v.mark})" stroke={ORANGE_L} stroke-width="0.6">
				<line x1="-4" y1="0" x2="4" y2="0" />
				<line x1="0" y1="-4" x2="0" y2="4" />
			</g>
		{/each}

		<!-- Hoist: the crane lowers the inner chevron into place -->
		<g opacity={v.loadO}>
			<g transform="translate(0 {v.drop}) rotate({v.swing} 267 222)">
				<polygon points={INNER} fill={ORANGE_IN} stroke={ORANGE_IN} stroke-linejoin="round" stroke-width="4" />
				<g stroke={STEEL} stroke-width="0.7" opacity={v.slingO}>
					<line x1="267" y1="225" x2="229" y2="262" />
					<line x1="267" y1="225" x2="305" y2="262" />
				</g>
			</g>
			<g stroke={STEEL} fill="none" opacity={v.rigO}>
				<line x1="267" y1="-300" x2="267" y2={v.hy - 12} stroke-width="0.8" />
				<rect x="262" y={v.hy - 13} width="10" height="8" rx="1.2" fill={STEEL} stroke="none" />
				<path d="M267 {v.hy - 5} v3.5 a3.5 3.5 0 1 1 -3.5 3.5" stroke-width="1.5" stroke-linecap="round" />
			</g>
		</g>

		<!-- Build: roof halves slide together -->
		<g opacity={v.roofO} transform="translate({-70 * v.slide} {60 * v.slide})">
			<polygon
				clip-path="url(#sasL)"
				points={ROOF}
				fill={ORANGE_L}
				stroke={ORANGE_L}
				stroke-linejoin="round"
				stroke-width="9"
			/>
		</g>
		<g opacity={v.roofO} transform="translate({70 * v.slide} {60 * v.slide})">
			<polygon
				clip-path="url(#sasR)"
				points={ROOF}
				fill={ORANGE_R}
				stroke={ORANGE_R}
				stroke-linejoin="round"
				stroke-width="9"
			/>
		</g>

		<!-- Type -->
		<g fill={INK}>
			{#each v.letters as l, i (i)}
				<text x={l.x} y={338 + l.y} opacity={l.o} text-anchor="middle" style:font="800 44px {FONT}">{l.c}</text>
			{/each}
			<text
				x="267"
				y="367"
				opacity={v.subO}
				text-anchor="middle"
				style:font="400 17.5px {FONT}"
				style:letter-spacing="{v.track}px">CONSTRUCTION</text
			>
		</g>

		<!-- Progress -->
		<rect x="217" y="388" width="100" height="2.5" rx="1.25" fill={TRACK} />
		<rect x="217" y="388" width={100 * v.fill} height="2.5" rx="1.25" fill={ORANGE_L} />
	</svg>
</div>

<style>
	/* Hidden unless the pre-paint script in app.html opted this visit in. */
	.sas-loader {
		display: none;
	}

	:global(html.sas-intro) {
		overflow: hidden;
	}

	:global(html.sas-intro) .sas-loader {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: grid;
		place-items: center;
		overflow: hidden;
		background: #ffffff;
		cursor: pointer;
	}

	.sas-loader.done {
		display: none;
	}

	svg {
		/* Design stage: 760px on a 1920×1080 canvas → scale with the viewport, floor for phones */
		width: min(760px, max(min(18rem, 78vw), 39.6vw), 70svh);
		height: auto;
		overflow: visible;
		will-change: transform, opacity;
	}
</style>
