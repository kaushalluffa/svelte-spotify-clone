import { SPOTIFY_BASE_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
export const load = async ({ cookies, fetch, url }) => {
	const accessToken = cookies.get('access_token');
	const refreshToken = cookies.get('refresh_token');
	if (!accessToken) {
		return {
			user: null
		};
	}
	const profileResponse = await fetch(`${SPOTIFY_BASE_URL}/me`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	if (profileResponse?.ok) {
		const profile = await profileResponse.json();
		let userAllPlaylists = [];
		const userPlaylistsRes = await fetch('/api/spotify/me/playlists?limit=50');
		if (userPlaylistsRes?.ok) {
			const userPlaylistsJSON = await userPlaylistsRes.json();
			userAllPlaylists = userPlaylistsJSON?.items;
		}
		return { user: profile, userAllPlaylists };
	} else if (profileResponse?.status === 401 && refreshToken) {
		const refreshResponse = await fetch('/api/auth/refresh');
		if (refreshResponse?.ok) {
			redirect(307, url?.pathname);
		}
		return { user: null };
	} else {
		return { user: null };
	}
};
