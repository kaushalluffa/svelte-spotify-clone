import fetchRefresh from '$helpers/fetch-refresh.js';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, params, depends, route }) => {
	depends(`app:${route?.id}`);
	const albumRes = await fetchRefresh(fetch, `/api/spotify/albums/${params?.id}`);
	if (!albumRes?.ok) {
		throw error(albumRes?.status, 'Failed to load album');
	}
	const albumJson = await albumRes.json();
	let color = null;
	if (albumJson?.images?.length > 0) {
		const colorRes = await fetch(
			`/api/average-color?${new URLSearchParams({ image: albumJson?.images?.[0]?.url })?.toString()}`
		);
		if (colorRes?.ok) {
			color = (await colorRes.json())?.color;
		}
	}
	return { album: albumJson, title: albumJson?.name, color };
};
