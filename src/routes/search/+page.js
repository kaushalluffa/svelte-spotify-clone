import { fetchRefresh } from '$helpers';
import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, url }) => {
	const query = url.searchParams.get('q');
	if (query) {
		redirect(307, `/search/${query}`);
	}
	const catsRes = await fetchRefresh(fetch, `/api/spotify/browse/categories?limit=50`);
	return {
		title: 'Search',
		categories: catsRes.ok ? catsRes?.json() : undefined
	};
};
