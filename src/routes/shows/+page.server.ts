import type { PageServerLoad } from './$types';
import { tmdbFetch, endpoints } from '$lib/tmdb';

export const load: PageServerLoad = async ({ fetch, url }) => {
    try {
        const genreId = url.searchParams.get('genre');
        const sortBy = url.searchParams.get('sort') || 'popularity.desc';
        const page = url.searchParams.get('page') || '1';

        // Always fetch TV genres
        const genresRes = await tmdbFetch(endpoints.genres('tv'), {}, fetch);
        const genres = genresRes.genres || [];

        // If filtering, use discover
        if (genreId || sortBy !== 'popularity.desc') {
            const params: Record<string, string> = {
                sort_by: sortBy,
                page: page,
                include_adult: 'false',
                include_video: 'false'
            };

            if (genreId) params.with_genres = genreId;

            const filtered = await tmdbFetch(endpoints.discover('tv'), params, fetch);
            return {
                genres,
                filtered: filtered.results || [],
                isFiltered: true
            };
        }

        // Default view
        const [popular, topRated] = await Promise.all([
            tmdbFetch(endpoints.popular('tv'), {}, fetch),
            tmdbFetch(endpoints.topRated('tv'), {}, fetch)
        ]);

        return {
            genres,
            popular: popular.results || [],
            topRated: topRated.results || [],
            isFiltered: false
        };
    } catch (err) {
        console.error('Error loading shows data:', err);
        return { genres: [], popular: [], topRated: [], isFiltered: false };
    }
};

