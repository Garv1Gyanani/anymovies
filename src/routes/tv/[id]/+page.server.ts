import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { tmdbFetch, endpoints } from '$lib/tmdb';

export const load: PageServerLoad = async ({ params, fetch }) => {
    try {
        const show = await tmdbFetch(endpoints.details('tv', params.id), {
            append_to_response: 'videos,credits,similar'
        }, fetch);

        return { show };
    } catch (e) {
        throw error(404, 'Show not found');
    }
};
            