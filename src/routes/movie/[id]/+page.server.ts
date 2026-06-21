import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { tmdbFetch, endpoints } from '$lib/tmdb';

export const load: PageServerLoad = async ({ params, fetch }) => {
    try {
        const movie = await tmdbFetch(endpoints.details('movie', params.id), {
            append_to_response: 'videos,credits,similar'
        }, fetch);

        return { movie };
    } catch (e) {
        throw error(404, 'Movie not found');
    }
};
