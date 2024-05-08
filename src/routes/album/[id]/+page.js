import fetchRefresh from '$helpers/fetch-refresh.js';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, params }) => {
	const albumRes = await fetchRefresh(fetch, `/api/spotify/albums/${params?.id}`);
	if (!albumRes?.ok) {
		throw error(albumRes?.status, 'Failed to load album');
	}
	const albumJson = await albumRes.json();
	return { album: albumJson, title: albumJson?.name };
};
