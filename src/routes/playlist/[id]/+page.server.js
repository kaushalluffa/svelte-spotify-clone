import { SPOTIFY_BASE_URL } from '$env/static/private';
import { fail } from '@sveltejs/kit';
export const actions = {
	followPlaylist: async ({ cookies, params, fetch }) => {
		const res = await fetch(`${SPOTIFY_BASE_URL}/playlists/${params?.id}/followers`, {
			headers: {
				Authorization: `Bearer ${cookies?.get('access_token')}`
			},
			method: 'PUT'
		});
		if (!res.ok) {
			throw fail(res?.status, { followError: res?.statusText, followForm: true });
		}
	},

	unFollowPlaylist: async ({ cookies, params, fetch }) => {
		const res = await fetch(`${SPOTIFY_BASE_URL}/playlists/${params?.id}/followers`, {
			headers: {
				Authorization: `Bearer ${cookies?.get('access_token')}`
			},
			method: 'DELETE'
		});
		if (!res.ok) {
			throw fail(res?.status, { followError: res?.statusText, followForm: true });
		}
	}
};
