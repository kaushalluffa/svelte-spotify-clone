<script>
	import { Home, Search, ListMusic, Menu, X } from 'lucide-svelte';
	import logo from '$assets/logo.png';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { tick } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import { IconButton } from '$components';
	export let desktop;
	export let userAllPlaylists;
	let isMobileMenuOpen = false;
	$: isOpen = desktop || isMobileMenuOpen;
	let openMenuButton;
	let closeMenuButton;
	let lastFocusableElement;
	const openMenu = async () => {
		isMobileMenuOpen = true;
		await tick();
		closeMenuButton?.getButton()?.focus();
	};
	const closeMenu = async () => {
		isMobileMenuOpen = false;
		await tick();
		openMenuButton?.getButton()?.focus();
	};
	const moveFocusToBottom = (event) => {
		if (desktop) return;
		if (event?.key === 'Tab' && event?.shiftKey) {
			event?.preventDefault();
			lastFocusableElement?.focus();
		}
	};
	const moveFocusToTop = (event) => {
		if (desktop) return;
		if (event?.key === 'Tab' && !event?.shiftKey) {
			event?.preventDefault();
			closeMenuButton?.getButton()?.focus();
		}
	};
	const handleEscPress = (event) => {
		if (event?.key === 'Escape') {
			closeMenu();
		}
	};
	const menuItems = [
		{ path: '/', label: 'Home', icon: Home },
		{ path: '/search', label: 'Search', icon: Search },
		{ path: '/playlists', label: 'Playlists', icon: ListMusic }
	];
	beforeNavigate(() => {
		isMobileMenuOpen = false;
	});
</script>

<svelte:head>
	{#if !desktop && isMobileMenuOpen}
		<style>
			body {
				overflow: hidden;
			}
		</style>
	{/if}
</svelte:head>
<div class="nav-content" class:desktop class:mobile={!desktop}>
	{#if !desktop && isMobileMenuOpen}
		<div
			class="overlay"
			on:click={closeMenu}
			transition:fade={{ duration: 200 }}
			on:keyup={handleEscPress}
			role="button"
			tabindex="0"
		/>
	{/if}
	<nav aria-label="Main">
		{#if !desktop}
			<IconButton
				bind:this={openMenuButton}
				on:click={openMenu}
				aria-expanded={isOpen}
				icon={Menu}
				label="Open menu"
				class="menu-button"
			/>
		{/if}
		<div
			class="nav-content-inner"
			class:is-hidden={!isOpen}
			style:visibility={isOpen ? 'visible' : 'hidden'}
			on:keyup={handleEscPress}
			role="button"
			tabindex="0"
		>
			{#if !desktop}
				<IconButton
					bind:this={closeMenuButton}
					on:click={closeMenu}
					on:keydown={moveFocusToBottom}
					icon={X}
					label="Close menu"
					class="close-menu-button"
				/>
				<button>Close</button>
			{/if}
			<div class="logo-and-menu">
				<img src={logo} class="logo" alt="Spotify" />
				<ul>
					{#each menuItems as item, index}
						{@const iconProps = {
							focusable: 'false',
							'aria-hidden': 'true',
							color: 'var(--text-color)',
							size: 26
						}}
						<li class:active={item?.path === $page?.url?.pathname}>
							{#if menuItems?.length === index + 1}
								<a bind:this={lastFocusableElement} href={item?.path} on:keydown={moveFocusToTop}>
									<svelte:component this={item?.icon} {...iconProps} />
									{item?.label}
								</a>
							{:else}
								<a href={item?.path}>
									<svelte:component this={item?.icon} {...iconProps} />
									{item?.label}
								</a>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
			{#if userAllPlaylists && userAllPlaylists?.length > 0}
				<div class="all-playlists">
					<ul>
						{#each userAllPlaylists as playlist}
							<li class:active={$page?.url?.pathname === `/playlist/${playlist?.id}`}>
								<a href="/playlist/{playlist?.id}">{playlist?.name}</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</nav>
</div>

<style lang="scss">
	.nav-content {
		.overlay {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background-color: var(--sidebar-color);
			opacity: 0.75;
			z-index: 100;
			@include breakpoint.up('md') {
				display: none;
			}
		}
		.logo {
			max-width: 100%;
			width: 130px;
		}
		.nav-content-inner {
			min-width: var(--sidebar-width);
			background-color: var(--sidebar-color);
			height: 100vh;
			display: none;
			.logo-and-menu {
				padding: 20px 20px 0;
				overflow: hidden;
			}
			.all-playlists {
				flex: 1;
				overflow: auto;
				padding: 15px 20px;
				border-top: 1px solid var(--border);
				ul {
					list-style: none;
					margin: 0;
					li {
						margin: 0 0 5px;
						a {
							white-space: pre;
							margin: 0;
						}
					}
				}
				:global(html.no-js) & {
					@include breakpoint.down('md') {
						display: none;
					}
				}
			}
			:global(html.no-js) & {
				@include breakpoint.down('md') {
					display: block;
					height: auto;
				}
			}
			ul {
				padding: 0;
				margin: 20px 0 0;
				list-style: none;
				li {
					a {
						display: flex;
						align-items: center;
						text-decoration: none;
						color: var(--text-color);
						font-size: functions.toRem(14);
						font-weight: 500;
						padding: 5px;
						margin: 10px 0;
						opacity: 0.7;
						transition: opacity 0.2s;
						&:hover,
						&:focus {
							opacity: 1;
						}
						:global(svg) {
							margin-right: 12px;
						}
					}
					&.active {
						a {
							opacity: 1;
						}
					}
				}
			}
		}
		&.desktop {
			position: sticky;
			top: 0;
			.nav-content-inner {
				@include breakpoint.up('md') {
					display: flex;
					flex-direction: column;
				}
			}
		}
		&.mobile .nav-content-inner {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 100;
			transition:
				transform 200ms,
				opacity 200ms;
			&.is-hidden {
				transition:
					transform 200ms,
					opacity 200ms,
					visibility 200ms;
				opacity: 0;
				transform: translateX(-100%);
			}
			@include breakpoint.down('md') {
				display: flex;
				flex-direction: column;
			}
		}
		:global(.menu-button) {
			@include breakpoint.up('md') {
				display: none;
			}
		}
		:global(.close-menu-button) {
			position: absolute;
			right: 20px;
			top: 20px;
		}
	}
</style>
