import { redirect } from '@sveltejs/kit';

export const load = async ({ data, url }) => {
	const { user, userAllPlaylists } = data || {};
	if (user && url?.pathname === '/login') {
		throw redirect(303, '/');
	}
	if (!user && url?.pathname !== '/login') {
		throw redirect(303, '/login');
	}
	return { user, userAllPlaylists };
};
