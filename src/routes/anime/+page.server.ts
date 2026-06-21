import type { PageServerLoad } from './$types';
import { tmdbFetch, endpoints } from '$lib/tmdb';

export const load: PageServerLoad = async ({ fetch }) => {
    try {
        const [popularShows, popularMovies, topRatedShows] = await Promise.all([
            tmdbFetch(endpoints.discover('tv'), {
                with_genres: '16',
                with_original_language: 'ja',
                sort_by: 'popularity.desc'
            }, fetch),
            tmdbFetch(endpoints.discover('movie'), {
                with_genres: '16',
                with_original_language: 'ja',
                sort_by: 'popularity.desc'
            }, fetch),
            tmdbFetch(endpoints.discover('tv'), {
                with_genres: '16',
                with_original_language: 'ja',
                sort_by: 'vote_average.desc',
                'vote_count.gte': '500'
            }, fetch)
        ]);

        return {
            popularShows: popularShows.results || [],
            popularMovies: popularMovies.results || [],
            topRatedShows: topRatedShows.results || []
        };
    } catch (err) {
        console.error('Error loading anime data:', err);
        return { popularShows: [], popularMovies: [], topRatedShows: [] };
    }
};
