import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components',
			$assets: 'src/assets',
			$actions: 'src/lib/actions',
			$helpers: 'src/lib/helpers',
			$stores: 'src/lib/stores'
		}
	},
	preprocess: preprocess({
		scss: {
			prependData: `@use "src/styles/functions"; @use "@unsass/breakpoint";`
		}
	})
};

export default config;
