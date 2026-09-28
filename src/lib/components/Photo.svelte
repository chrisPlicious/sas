<script lang="ts">
	import { src, srcset, type Photo } from '$lib/content/photos';

	let {
		photo,
		sizes = '100vw',
		eager = false,
		class: className = '',
		alt
	}: { photo: Photo; sizes?: string; eager?: boolean; class?: string; alt?: string } = $props();
</script>

<img
	class="photo {className}"
	class:photo-color={photo.color}
	src={src(photo, 1200)}
	srcset={srcset(photo)}
	{sizes}
	width={photo.w}
	height={photo.h}
	alt={alt ?? photo.alt}
	loading={eager ? 'eager' : 'lazy'}
	fetchpriority={eager ? 'high' : 'auto'}
	decoding="async"
/>
