<script>
	import MicroModal from 'micromodal';
	import { toasts } from '$stores';
	import { Button, Card, Pagination, PlaylistForm } from '$components';
	import { Modal } from '$components';
	export let form;
	export let data;
	$: playlists = data?.userPlaylists;
	let isLoading = false;
	async function loadMoreItems() {
		if (!playlists?.next) return;
		isLoading = true;
		const res = await fetch(
			playlists?.next?.replace('https://api.spotify.com/v1/', '/api/spotify/')
		);
		if (res?.ok) {
			const resJSON = await res.json();
			playlists = {
				...resJSON,
				items: [...playlists?.items, ...resJSON?.items]
			};
		} else {
			toasts.error('Could not load data');
		}
		isLoading = false;
	}
</script>

<div class="content">
	{#if playlists?.items?.length > 0}
		<div class="title">
			<h1>{data?.title}</h1>
			<Button
				element="a"
				href="/playlists/new"
				on:click={(e) => {
					e?.preventDefault();
					MicroModal.show('add-playlists-modal');
				}}>Add New</Button
			>
		</div>
		<div class="grid-items">
			{#each playlists?.items as item}
				<Card {item} />
			{/each}
		</div>
		<Pagination {isLoading} paginatedList={playlists} on:loadmore={loadMoreItems} />
	{:else}
		<div class="empty">
			<p>No Playlists yet</p>
			<Button element="a" href="/playlists/new">Add New</Button>
		</div>
	{/if}
</div>
<Modal id="add-playlists-modal" title="Add a new playlist">
	<PlaylistForm {form} userID={data?.user?.id} action="/playlists/new" />
</Modal>

<style lang="scss">
	.content {
		padding-bottom: 60px;
		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.grid-items {
			margin-bottom: 40px;
		}
		.empty {
			text-align: center;
			margin-top: 40px;
			p {
				font-size: functions.toRem(22);
				font-weight: 600;
			}
		}
	}
</style>
