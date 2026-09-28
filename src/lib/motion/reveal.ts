// Section reveals. Elements opt in with `data-reveal` (rise) or
// `data-reveal="wipe"` (roof-pitch cut) plus an optional `--i` stagger index.
// The pre-paint script in app.html adds `html.reveal-ready` only when motion is
// allowed; without it every element stays visible (see app.css).
//
// Each element eases in once, the first time 12% of it is on screen, and is
// then unobserved for good: scrolling back never replays it.

const IN_RATIO = 0.12;
// Longest entrance (1100ms) + max stagger (5 × 90ms) + margin.
const SETTLE_MS = 1700;

// Play the entrance, then hand the element back to its normal styles:
// removing data-reveal drops the mask/transform so nothing lingers
// (masks would otherwise clip focus rings and overflowing content).
function play(el: Element) {
	el.classList.add('is-in');
	setTimeout(() => {
		el.removeAttribute('data-reveal');
		el.classList.remove('is-in');
	}, SETTLE_MS);
}

export function startReveals(): () => void {
	const root = document.documentElement;
	if (!root.classList.contains('reveal-ready')) return () => {};
	(window as Window & { __sasReveal?: boolean }).__sasReveal = true;

	// Hold reveals while the entry loader or the page transition covers the page.
	const pending = new Set<Element>();
	const covered = () =>
		root.classList.contains('sas-intro') || root.classList.contains('pt-cover');

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting || entry.intersectionRatio < IN_RATIO) continue;
				const el = entry.target;
				io.unobserve(el);
				if (covered()) pending.add(el);
				else play(el);
			}
		},
		{ threshold: IN_RATIO }
	);

	const observe = (el: Element) => io.observe(el);

	const observeWithin = (node: Node) => {
		if (!(node instanceof Element)) return;
		if (node.hasAttribute('data-reveal')) observe(node);
		node.querySelectorAll('[data-reveal]').forEach(observe);
	};

	const unobserveWithin = (node: Node) => {
		if (!(node instanceof Element)) return;
		if (node.hasAttribute('data-reveal')) io.unobserve(node);
		node.querySelectorAll('[data-reveal]').forEach((el) => {
			io.unobserve(el);
			pending.delete(el);
		});
	};

	observeWithin(document.body);

	// New pages (client navigation) and re-rendered lists (filters, form states)
	const dom = new MutationObserver((records) => {
		for (const r of records) {
			r.addedNodes.forEach(observeWithin);
			r.removedNodes.forEach(unobserveWithin);
		}
	});
	dom.observe(document.body, { childList: true, subtree: true });

	// Release held reveals the moment the cover lifts.
	const intro = new MutationObserver(() => {
		if (covered()) return;
		pending.forEach(play);
		pending.clear();
	});
	intro.observe(root, { attributes: true, attributeFilter: ['class'] });

	return () => {
		io.disconnect();
		dom.disconnect();
		intro.disconnect();
	};
}
