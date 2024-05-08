<script>
	export let data;
	import { getCopyrightSymbol } from '$helpers';
	$: album = data?.album;
</script>

<h1>{album?.name}</h1>
<div class="tracks">
	<ul>
		{#each album?.tracks?.items as track}
			<li>{track?.name}</li>
		{/each}
	</ul>
</div>
<div class="credits">
	<p class="date">
		{new Date(album?.release_date)?.toLocaleDateString('en', { dateStyle: 'medium' })}
	</p>
	{#each album?.copyrights as copyright}
		<p class="copyright">
			{getCopyrightSymbol(copyright?.type)}{copyright?.text}
		</p>
	{/each}
</div>

<style lang="scss">
	.credits {
		margin-trim: 40px;
		p {
			color: var(--light-gray);
			margin: 0;
			font-size: functions.toRem(11);
			&.date {
				font-size: functions.toRem(13);
			}
		}
	}
</style>
