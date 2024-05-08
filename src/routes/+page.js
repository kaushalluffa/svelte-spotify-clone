import fetchRefresh from '$helpers/fetch-refresh.js';

export const load = async ({ fetch: _fetch, parent }) => {
	const { user } = await parent();
	const fetch = (path) => fetchRefresh(_fetch, path);
	const newReleases = fetch('/api/spotify/browse/new-releases?limit=6');
	const featuredPlaylists = fetch('/api/spotify/browse/featured-playlists?limit=6');
	const userPlaylists = fetch(`/api/spotify/users/${user?.id}/playlists?limit=6`);
	const allCategories = await fetch(`/api/spotify/browse/categories`);
	const allCategoriesJSON = allCategories?.ok ? await allCategories?.json() : undefined;
	const randomCategories = allCategoriesJSON
		? allCategoriesJSON?.categories?.items?.sort(() => 0.5 - Math.random())?.slice(0, 3)
		: [];
	const randomCategoriesPromises = randomCategories?.map((category) =>
		fetch(`/api/spotify/browse/categories/${category?.id}/playlists?limit=6`)
	);
	const [newReleasesRes, featuredPlaylistsRes, userPlaylistsRes] = await Promise.all([
		newReleases,
		featuredPlaylists,
		userPlaylists
	]);
	const randomCategoriesRes = await Promise.all(randomCategoriesPromises);
	const newReleasesData = newReleasesRes?.ok ? await newReleasesRes?.json() : undefined;
	const featuredPlaylistsData = featuredPlaylistsRes?.ok
		? await featuredPlaylistsRes?.json()
		: undefined;
	const userPlaylistsData = userPlaylistsRes?.ok ? await userPlaylistsRes?.json() : undefined;
	const categoriesPlaylistsData = await Promise.all(
		randomCategoriesRes?.map(async (response) =>
			response?.ok ? await response?.json() : undefined
		)
	);

	return {
		newReleases: newReleasesData,
		featuredPlaylists: featuredPlaylistsData,
		userPlaylists: userPlaylistsData,
		homeCategories: randomCategories,
		categoriesPlaylists: categoriesPlaylistsData
	};
};
