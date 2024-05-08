<script>
	import { ItemPage } from '$components';
	export let data;
	import { getCopyrightSymbol } from '$helpers';
	$: album = data?.album;
</script>

<ItemPage
	type={album?.album_type}
	title={album?.name}
	color={undefined}
	image={album?.images?.length > 0 ? album?.images?.[0]?.url : undefined}
>
	<p class="meta" slot="meta">
		<span class="artists">{album?.artists?.map((item) => item?.name)?.join(', ')}</span>
		<span class="date">{new Date(album?.release_date)?.getFullYear()}</span>
		<span class="tracks-count">
			{`${album?.total_tracks} Track${album?.total_tracks > 1 ? 's' : ''}`}
		</span>
	</p>
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
</ItemPage>

<style lang="scss">
	.meta {
		font-size: functions.toRem(13);
		font-weight: 600;
		span {
			margin-right: 5px;
			&.tracks-count {
				font-weight: 400;
				margin: 0 0 0 5px;
				color: var(--light-gray);
			}
		}
	}
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
