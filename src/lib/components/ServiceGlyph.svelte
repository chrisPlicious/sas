<script lang="ts">
	// Line drawings for the four service plates. Drawn on a 120 grid in the
	// same 1.5 stroke as the blueprint texture they sit on.
	type Glyph = 'frame' | 'plan' | 'tile' | 'compactor';

	let { name, class: className = '' }: { name: Glyph; class?: string } = $props();
</script>

<svg
	class={className}
	viewBox="0 0 120 120"
	fill="none"
	stroke="currentColor"
	stroke-width="1.5"
	stroke-linejoin="miter"
	aria-hidden="true"
>
	{#if name === 'frame'}
		<!-- RC frame under the SAS roof -->
		<path d="M12 50 60 21l48 29" />
		<path d="M20 55 60 31l40 24" />
		<path d="M24 53v47M60 31v69M96 53v47" />
		<path d="M24 76h72M24 100h72" />
		<path d="M18 100h12v7H18zM54 100h12v7H54zM90 100h12v7H90z" />
		<path d="M42 76v24M78 76v24" stroke-dasharray="2 3" />
	{:else if name === 'plan'}
		<!-- Plan sheet, dimension line, seal -->
		<path d="M22 16h60l16 16v74H22z" />
		<path d="M82 16v16h16" />
		<path d="M32 40h40v36H32z" />
		<path d="M52 40v20M52 60h20M32 60h12" />
		<path d="M32 30h40M32 27v6M72 27v6" />
		<circle cx="82" cy="90" r="9" />
		<circle cx="82" cy="90" r="5" />
		<path d="M32 86h30M32 92h22" />
	{:else if name === 'tile'}
		<!-- Tile field, one tile being set -->
		<path d="M20 36h24v24H20zM48 36h24v24H48zM20 64h24v24H20zM48 64h24v24H48zM76 64h24v24H76z" />
		<path d="M20 92h24v8M48 92h24v8M76 92h24v8" />
		<path d="M80 22h24v24H80z" transform="rotate(-12 92 34)" />
		<path d="M88 52v6M85 55h6" />
	{:else if name === 'compactor'}
		<!-- Plate compactor, from the SAS rental list -->
		<path d="M14 90h66l8 8H14z" />
		<path d="M22 90V66h40v24" />
		<path d="M62 72h12v18" />
		<path d="M28 66V56h26v10" />
		<circle cx="42" cy="78" r="5" />
		<path d="M66 74 98 34l10 8-30 40" />
		<path d="M18 106h10M38 106h10M58 106h10M78 106h6" />
	{/if}
</svg>
