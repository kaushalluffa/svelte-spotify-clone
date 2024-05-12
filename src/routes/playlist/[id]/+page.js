import { fetchRefresh } from '$helpers';
import { error } from '@sveltejs/kit';
export const load = async ({ fetch: _fetch, params, depends, route }) => {
	depends(`app:${route?.id}`);
	const fetch = (path) => fetchRefresh(_fetch, path);
	const playlistRes = await fetch(`/api/spotify/playlists/${params?.id}`);
	if (!playlistRes?.ok) {
		throw error(playlistRes?.status, 'Failed to load playlist');
	}
	const playlistResJSON = await playlistRes.json();

	let color = null;
	if (playlistResJSON?.images?.length > 0) {
		const colorRes = await fetch(
			`/api/average-color?${new URLSearchParams({ image: playlistResJSON?.images?.[0]?.url })?.toString()}`
		);
		if (colorRes?.ok) {
			color = (await colorRes?.json())?.color;
		}
	}
	return {
		playlist: playlistResJSON,
		color,
		title: playlistResJSON?.name
	};
};
