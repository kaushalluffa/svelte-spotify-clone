<script>
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import { Navigation, Header } from '$components';
	export let data;
	let topbar;
	let scrollY;
	let headerOpacity = 0;
	$: user = data?.user;
	$: if (topbar) {
		headerOpacity =
			scrollY / topbar?.offsetHeight < 1 ? scrollY / topbar?.offsetHeight : 1;
	}
</script>

<svelte:window bind:scrollY />

<div id="main">
	{#if user}
		<div class="sidebar">
			<Navigation desktop={true} />
		</div>
	{/if}
	<div id="content">
		<div id="topbar" bind:this={topbar}>
			<div
				class="topbar-bg"
				style:background-color="var(--header-colo)"
				style:opacity={`${headerOpacity}`}
			/>
			<Header />
		</div>
		<main id="main-content" class:logged-in={user}>
			<slot />
		</main>
	</div>
</div>

<style lang="scss">
	#main {
		display: flex;
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
				.topbar-bg {
					position: absolute;
					width: 100%;
					top: 0;
					left: 0;
					height: 100%;
					z-index: -1;
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
				}
			}
		}
	}
</style>
