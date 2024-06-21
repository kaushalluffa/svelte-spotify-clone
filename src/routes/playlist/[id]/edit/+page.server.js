import { fail, redirect } from '@sveltejs/kit';
import { SPOTIFY_BASE_URL } from '$env/static/private';
export const actions = {
	default: async ({ fetch, request, cookies, url, params }) => {
		const data = await request?.formData();

		const name = data?.get('name');
		const description = data?.get('description');
		if (!name) {
			return fail(400, {
				name,
				description,
				nameError: 'Playlist name is required',
				apiError: false,
				editForm: true
			});
		}
		const res = await fetch(`${SPOTIFY_BASE_URL}/playlists/${params?.id}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${cookies?.get('access_token')}`
			},
			body: JSON.stringify({ name, description: description || undefined })
		});
		if (!res?.ok) {
			const errorJSON = await res.json();
			return fail(res.status, {
				name,
				description,
				nameError: false,
				apiError: errorJSON?.error?.message,
				editForm: true
			});
		} else {
			if (url?.searchParams?.has('redirect')) {
				redirect(303, `/playlist/${params?.id}`);
			}
		}
	}
};
