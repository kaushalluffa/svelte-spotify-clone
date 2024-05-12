<script>
	import { Button } from '$components';
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	export let paginatedList;
	export let isLoading;

	$: currentPage = $page?.url?.searchParams?.get('page') || 1;
	const dispatch = createEventDispatcher();
</script>

{#if paginatedList?.next}
	<div class="load-more">
		<Button
			element="button"
			variant="outline"
			disabled={isLoading}
			on:click={() => dispatch('loadmore')}
		>
			Load more <span class="visually-hidden"> Items </span>
		</Button>
	</div>
{/if}
<div class="pagination">
	<div class="previous">
		{#if paginatedList?.previous}
			<Button
				element="a"
				variant="outline"
				href="{$page?.url?.pathname}?{new URLSearchParams({
					page: `${Number(currentPage) - 1}`
				})?.toString()}"
			>
				Previous
			</Button>
		{/if}
	</div>
	<div class="next">
		{#if paginatedList?.next}
			<Button
				element="a"
				variant="outline"
				href="{$page?.url?.pathname}?{new URLSearchParams({
					page: `${Number(currentPage) + 1}`
				})?.toString()}"
			>
				Next
			</Button>
		{/if}
	</div>
</div>

<style lang="scss">
	.pagination {
		display: none;
		justify-content: space-between;
		:global(html.no-js) & {
			display: flex;
		}
	}
	.load-more {
		padding: 15px;
		text-align: center;
		:global(html.no-js) & {
			display: none;
		}
	}
</style>
