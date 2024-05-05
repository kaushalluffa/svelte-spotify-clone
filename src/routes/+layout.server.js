import { SPOTIFY_BASE_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
export const load = async ({ cookies, fetch, url }) => {
	const accessToken = cookies.get('access_token');
	const refreshToken = cookies.get('refresh_token');
	if (!accessToken) {
		return {
			user: null,
		};
	}
	const profileResponse = await fetch(`${SPOTIFY_BASE_URL}/me`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	if (profileResponse?.ok) {
		const profile = await profileResponse.json();
		return { user: profile };
	} else if (profileResponse?.status === 401 && refreshToken) {
		const refreshResponse = await fetch('/api/auth/refresh');
		if (refreshResponse?.ok) {
			throw redirect(307, url?.pathname);
		}
		return { user: null };
	} else {
		return { user: null };
	}
};
