<script>
	import { Music } from 'lucide-svelte';

	export let color;
	export let image;
	export let title;
	export let type;
</script>

<div class="banner">
	<div class="cover">
		{#if image}
			<img src={image} alt={title} />
		{:else}
			<div class="cover-placeholder">
				<Music focusable="false" aria-hidden="true" />
			</div>
		{/if}
	</div>
	<div class="info">
		{#if type}
			<p class="type">{type}</p>
		{/if}
		<h1 class="title">{title}</h1>
		<slot name="meta" />
	</div>
</div>
<div class="content">
	<slot />
</div>
