<script>
	import { hideAll } from 'tippy.js';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import { Navigation, Header, Toasts } from '$components';
	import { page } from '$app/stores';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';

	export let data;
	NProgress.configure({ showSpinner: false });
	let topbar;
	let scrollY;
	let headerOpacity = 0;
	$: user = data?.user;
	$: if (topbar) {
		headerOpacity = scrollY / topbar?.offsetHeight < 1 ? scrollY / topbar?.offsetHeight : 1;
	}
	afterNavigate(() => {
		NProgress.done();
	});
	beforeNavigate(() => {
		NProgress.start();
		hideAll();
	});
</script>

<svelte:window bind:scrollY />
<svelte:head>
	<title>Spotify Clone - {$page?.data?.title ? `${$page?.data?.title}` : ''}</title>
</svelte:head>
{#if user}
	<a href="#main-content" class="skip-link">Skip to content</a>
{/if}
<Toasts />
<div id="main">
	{#if user}
		<div class="sidebar">
			<Navigation desktop={true} />
		</div>
	{/if}
	<div id="content">
		{#if user}
			<div id="topbar" bind:this={topbar}>
				<div
					class="topbar-bg"
					style:background-color={$page?.data?.color ? $page?.data?.color : 'var(--header-color)'}
					style:opacity={`${headerOpacity}`}
				/>
				<Header />
			</div>
		{/if}
		<main id="main-content" class:logged-in={user}>
			<slot />
		</main>
	</div>
</div>

<style lang="scss">
	#main {
		display: flex;
		:global(html.no-js) & {
			@include breakpoint.down('md') {
				display: block;
			}
		}
		#content {
			flex: 1;
			#topbar {
				position: fixed;
				height: var(--header-height);
				padding: 0 15px;
				display: flex;
				align-items: center;
				width: 100%;
				z-index: 100;
				:global(html.no-js) & {
					position: sticky;
					top: 0;
					background-color: var(--header-color);
					height: auto;
					padding: 10px 20px;
					@include breakpoint.up('md') {
						position: fixed;
					}
				}
				.topbar-bg {
					position: absolute;
					width: 100%;
					top: 0;
					left: 0;
					height: 100%;
					z-index: -1;
					background-image: linear-gradient(rgba(0, 0, 0.2) 0 0);
				}
				@include breakpoint.up('md') {
					padding: 0 30px;
					width: calc(100% - var(--sidebar-width));
				}
			}
			main#main-content {
				padding: 30px 15px 60px;
				@include breakpoint.up('md') {
					padding: 30px 30px 60px;
				}
				&.logged-in {
					padding-top: calc(30px + var(--header-height));
					:global(html.no-js) & {
						@include breakpoint.down('md') {
							padding-top: 30px;
						}
					}
				}
			}
		}
	}
</style>
