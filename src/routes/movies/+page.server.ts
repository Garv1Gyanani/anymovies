import type { PageServerLoad } from './$types';
import { tmdbFetch, endpoints } from '$lib/tmdb';

export const load: PageServerLoad = async ({ fetch, url }) => {
    try {
        const genreId = url.searchParams.get('genre');
        const sortBy = url.searchParams.get('sort') || 'popularity.desc';
        const page = url.searchParams.get('page') || '1';

        // Always fetch genres
        const genresRes = await tmdbFetch(endpoints.genres('movie'), {}, fetch);
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

            const filtered = await tmdbFetch(endpoints.discover('movie'), params, fetch);
            return {
                genres,
                filtered: filtered.results || [],
                isFiltered: true
            };
        }

        // Default view
        const [popular, topRated, upcoming] = await Promise.all([
            tmdbFetch(endpoints.popular('movie'), {}, fetch),
            tmdbFetch(endpoints.topRated('movie'), {}, fetch),
            tmdbFetch(endpoints.upcoming(), {}, fetch)
        ]);

        return {
            genres,
            popular: popular.results || [],
            topRated: topRated.results || [],
            upcoming: upcoming.results || [],
            isFiltered: false
        };
    } catch (err) {
        console.error('Error loading movies data:', err);
        return { genres: [], popular: [], topRated: [], upcoming: [], isFiltered: false };
    }
};

