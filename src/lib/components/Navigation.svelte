<script>
	import { Home, Search, ListMusic } from 'lucide-svelte';
	import logo from '$assets/logo.png';
	import { page } from '$app/stores';
	export let desktop;
	const menuItems = [
		{ path: '/', label: 'Home', icon: Home },
		{ path: '/search', label: 'Search', icon: Search },
		{ path: '/playlists', label: 'Playlists', icon: ListMusic }
	];
</script>

<div class="nav-content" class:desktop class:mobile={!desktop}>
	<nav aria-label="Main">
		<div class="nav-content-inner">
			<img src={logo} class="logo" alt="Spotify" width="100px" />
			<ul>
				{#each menuItems as item}
					<li class:active={item?.path === $page?.url?.pathname}>
						<a href={item?.path}>
							<svelte:component
								this={item?.icon}
								focusable="false"
								aria-hidden="true"
								color="var(--text-color)"
								size={26}
							/>
							{item?.label}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</div>
