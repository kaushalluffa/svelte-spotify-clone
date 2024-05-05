<script>
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import { LogoutButton } from '$components';
	export let data;
	$: user = data?.user;
</script>

{#if user}
	<p>Hello {user?.display_name}</p>
	<LogoutButton />
{/if}

<slot />
