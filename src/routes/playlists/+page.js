import { fetchRefresh } from '$helpers';
import { error } from '@sveltejs/kit';
export const load = async ({ fetch, url }) => {
	const limit = 18;
	const page = url?.searchParams?.get('page') || 1;

	const searchParams = new URLSearchParams({
		limit: `${limit}`,
		offset: page ? `${limit * (Number(page) - 1)}` : '0'
	}).toString();
	const playlistRes = await fetchRefresh(fetch, `/api/spotify/me/playlists?${searchParams}`);

	if (!playlistRes?.ok) {
		error(playlistRes?.status, 'Failed to load playlists');
	}
	const playlistJSON = await playlistRes.json();
	return {
		userPlaylists: playlistJSON,
		title: 'Your Playlists'
	};
};
