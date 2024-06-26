import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export default async function fetchRefresh(fetch, path) {
	const req = fetch(path);
	if (!browser) {
		return req;
	}
	const res = await req;
	if (res?.status === 401) {
		if (!window?.refreshPromise) {
			window.refreshPromise = fetch('/api/auth/refresh').finally(
				() => (window.refreshPromise = null)
			);
		}
		const refreshResponse = await window?.refreshPromise;
		if (!refreshResponse?.ok) {
			error(401, 'Session expired');
		}
		return fetch(path);
	} else {
		return res;
	}
}
