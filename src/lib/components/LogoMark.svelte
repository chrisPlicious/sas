<script lang="ts">
	// SAS roof mark, redrawn from the client logo: two nested chevrons,
	// 31° pitch, left face lit, right face in shade.
	type Tone = 'brand' | 'ink' | 'current';

	let { tone = 'brand', class: className = '', title }: { tone?: Tone; class?: string; title?: string } =
		$props();

	const faces = {
		brand: ['#FF8D06', '#EB8205'],
		ink: ['#1c1b19', '#1c1b19'],
		current: ['currentColor', 'currentColor']
	} as const;

	const [lit, shade] = $derived(faces[tone]);
</script>

<svg
	class={className}
	viewBox="0 0 220 120"
	role={title ? 'img' : undefined}
	aria-hidden={title ? undefined : 'true'}
	aria-label={title}
>
	<path fill={lit} d="M110 0 L4.3 62.65 Q0 65.2 0 70.2 L0 119.2 L110 54 Z" />
	<path fill={shade} d="M110 0 L215.7 62.65 Q220 65.2 220 70.2 L220 119.2 L110 54 Z" />
	<path fill={lit} d="M110 72 L73.44 93.66 Q70 95.7 70 99.2 L70 115.7 L110 92 Z" />
	<path fill={shade} d="M110 72 L146.56 93.66 Q150 95.7 150 99.2 L150 115.7 L110 92 Z" />
</svg>
