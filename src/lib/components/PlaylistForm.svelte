<script>
	import { enhance, applyAction } from '$app/forms';
	import { Button } from '$components';
	import { createEventDispatcher } from 'svelte';
	let isLoading = false;
	export let form;
	export let userID;
	export let action;
	export let playlist = undefined;
	const dispatch = createEventDispatcher();
</script>

<form
	method="POST"
	{action}
	use:enhance={() => {
		isLoading = true;
		return async ({ result }) => {
			await applyAction(result);
			isLoading = false;
			if (result?.type === 'success') {
				dispatch('success');
			}
			if (result?.type === 'redirect') {
				dispatch('redirect');
			}
		};
	}}
>
	{#if userID}
		<input hidden name="userID" value={userID} />
	{/if}
	<div class="fields" class:has-error={form?.nameError}>
		<label for="playlist-name">Name *</label>
		<input
			type="text"
			id="playlist-name"
			name="name"
			placeholder="Playlist name"
			value={form?.name || playlist?.name || ''}
		/>
		{#if form?.nameError}
			<p class="error">{form?.nameError}</p>
		{/if}
	</div>
	<div class="fields">
		<label for="playlist-name">Description</label>
		<input
			type="text"
			id="playlist-description"
			name="description"
			placeholder="Playlist description"
			value={form?.description || playlist?.description || ''}
		/>
	</div>
	{#if form?.apiError}
		<p class="error">{form?.apiError}</p>
	{/if}
	<div class="submit-button">
		<Button disabled={isLoading} element="button" type="submit"
			>{playlist ? 'Save' : 'Create'} Playlist</Button
		>
	</div>
</form>

<style lang="scss">
	form {
		max-width: 400px;
		.fields {
			margin-bottom: 20px;
			&.has-error input {
				outline: 2px solid var(--error);
			}
			label {
				display: inline-block;
				margin-bottom: 10px;
				font-size: functions.toRem(14);
			}
			input {
				width: 100%;
			}
		}
		p.error {
			color: var(--error);
			font-size: functions.toRem(14);
			margin: 10px 0 0;
		}
		.submit-button {
			text-align: right;
			margin-top: 40px;
		}
	}
</style>
