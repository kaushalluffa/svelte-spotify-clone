import { fetchRefresh } from '$helpers';
import { error } from '@sveltejs/kit';
export const load = async ({ fetch, params }) => {
	const playlistRes = await fetchRefresh(
		fetch,
		`/api/spotify/playlists/${params?.id}?${new URLSearchParams({ fields: 'id,name,description' }).toString()}`
	);
	if (!playlistRes?.ok) {
		error(playlistRes?.status, 'Failed to load playlist');
	}
	const playlistJSON = await playlistRes.json();
	return {
		playlist: playlistJSON,
		title: `Edit ${playlistJSON?.name}`
	};
};
