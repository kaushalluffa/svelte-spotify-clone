<script>
	import { Clock8, ListPlus } from 'lucide-svelte';
	import { msToTime } from '$helpers';
	export let tracks;
</script>

<div class="tracks">
	<div class="row header">
		<div class="number-column">
			<span class="number">#</span>
		</div>
		<div class="info-column">
			<span class="track-title">Title</span>
		</div>
		<div class="duration-column">
			<Clock8 aria-hidden="true" focusable="false" />
		</div>
		<div class="actions-column" />
	</div>
	{#each tracks as track, index}
		<div class="row">
			<div class="number-column">
				<span class="number">{index + 1}</span>
			</div>
			<div class="info-column">
				<div class="track-title">
					<h4>{track?.name}</h4>
					{#if track?.explicit}
						<span class="explicit">EXPLICIT</span>
					{/if}
				</div>
				<p class="artists">
					{#each track?.artists as artist, artistIndex}
						<a href="/artist/{artist?.id}">{artist?.name}</a>
						{#if artistIndex < track?.artists?.length - 1},
						{/if}
					{/each}
				</p>
			</div>
			<div class="duration-column">
				<span class="duration">{msToTime(track?.duration_ms)}</span>
			</div>
			<div class="actions-column">
				<ListPlus aria-hidden="true" focusable="false" />
			</div>
		</div>
	{/each}
</div>
