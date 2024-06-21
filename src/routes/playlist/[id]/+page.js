import { fetchRefresh } from '$helpers';
import { error } from '@sveltejs/kit';
export const load = async ({ fetch: _fetch, params, depends, route, url, parent }) => {
	depends(`app:${route?.id}`);
	const { user } = await parent();
	const limit = 100;
	const page = url?.searchParams?.get('page');
	const fetch = (path) => fetchRefresh(_fetch, path);

	const [playlistRes, isFollowingRes] = await Promise.all([
		fetch(`/api/spotify/playlists/${params?.id}`),
		fetch(
			`/api/spotify/playlists/${params?.id}/followers/contains?${new URLSearchParams({ ids: user ? user?.id : '' }).toString()}`
		)
	]);
	if (!playlistRes?.ok) {
		error(playlistRes?.status, 'Failed to load playlist');
	}
	let isFollowing = null;
	if (isFollowingRes?.ok) {
		const isFollowingResJSON = await isFollowingRes.json();
		isFollowing = isFollowingResJSON[0];
	}
	const playlistResJSON = await playlistRes.json();
	if (page && page !== '1') {
		const trackRes = await fetch(
			`/api/spotify/playlists/${params?.id}/tracks?${new URLSearchParams({ limit: `${limit}`, offset: `${limit * (Number(page) - 1)}` }).toString()}`
		);
		if (!trackRes.ok) {
			error(trackRes.status, 'Failed to load playlist tracks');
		}
		const trackResJSON = await trackRes.json();
		playlistResJSON.tracks = trackResJSON;
	}

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
		title: playlistResJSON?.name,
		isFollowing
	};
};
