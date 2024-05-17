import { SPOTIFY_BASE_URL } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';

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
	},
	removeItem: async ({ request, cookies, params }) => {
		const data = await request.formData();
		const track = data.get('track');
		const playlist = params.id;

		const res = await fetch(`${SPOTIFY_BASE_URL}/playlists/${playlist}/tracks`, {
			method: 'DELETE',
			body: JSON.stringify({
				uris: [`spotify:track:${track}`]
			}),
			headers: {
				Authorization: `Bearer ${cookies.get('access_token')}`
			}
		});

		if (!res.ok) {
			throw redirect(303, `/playlist/${playlist}?error=${res.statusText}`);
		}

		throw redirect(303, `/playlist/${playlist}?success=Track removed successfully!`);
	}
};
