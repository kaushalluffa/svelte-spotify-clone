import { fail, redirect } from '@sveltejs/kit';
import { SPOTIFY_BASE_URL } from '$env/static/private';
export const actions = {
	default: async ({ cookies, fetch, request }) => {
		const data = await request?.formData();

		const name = data?.get('name');
		const description = data?.get('description');
		const userID = data?.get('userID');
		if (!name) {
			return fail(400, {
				name,
				description,
				nameError: 'Playlist name is required',
				apiError: false
			});
		}
		const res = await fetch(`${SPOTIFY_BASE_URL}/users/${userID}/playlists`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${cookies?.get('access_token')}`
			},
			body: JSON.stringify({ name, description })
		});
		if (!res?.ok) {
			const errorJSON = await res.json();
			return fail(res.status, {
				name,
				description,
				nameError: false,
				apiError: errorJSON?.error?.message
			});
		} else {
			const resJSON = await res.json();
			redirect(303, `/playlist/${resJSON?.id}`);
		}
	}
};
