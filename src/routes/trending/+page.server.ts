import type { PageServerLoad } from './$types';
import { tmdbFetch, endpoints } from '$lib/tmdb';

export const load: PageServerLoad = async ({ fetch }) => {
    try {
        const trendingWeek = await tmdbFetch(endpoints.trending('all', 'week'), {}, fetch);

        return {
            trending: trendingWeek.results || []
        };
    } catch (err) {
        console.error('Error loading trending data:', err);
        return { trending: [] };
    }
};
