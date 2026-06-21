import type { PageServerLoad } from './$types';
import { tmdbFetch, endpoints } from '$lib/tmdb';

export const load: PageServerLoad = async ({ url, fetch }) => {
    const query = url.searchParams.get('q');

    if (!query) {
        return { results: [], query: '' };
    }

    try {
        const data = await tmdbFetch(endpoints.search('multi'), {
            query: query,
            include_adult: 'false'
        }, fetch);

        return {
            results: data.results || [],
            query
        };
    } catch (err) {
        console.error('Search error:', err);
        return { results: [], query };
    }
};
