import { json } from '@sveltejs/kit';
import sharp from 'sharp';

export const GET = async ({ fetch, url }) => {
	const imageURL = url?.searchParams?.get('image');
	if (imageURL) {
		const image = await fetch(imageURL);
		const buffer = await image.arrayBuffer();
		const stats = await sharp(Buffer.from(buffer)).stats();
		const [r, g, b] = stats?.channels?.map((c) => c?.mean) ?? [0, 0, 0];
		return json({ color: `rgba(${r},${g},${b})` });
	}

	return json({ color: null });
};
