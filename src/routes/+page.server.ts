import type { PageServerLoad } from './$types';
import { tmdbFetch, endpoints } from '$lib/tmdb';
import { fetchLatest } from '$lib/vidsrc';

export const load: PageServerLoad = async ({ fetch }) => {
    try {
        const [trending, popularMovies, topRatedTV, upcoming, latestVidSrcMovie, latestVidSrcTV, popularAnime] = await Promise.all([
            tmdbFetch(endpoints.trending('all', 'day'), {}, fetch),
            tmdbFetch(endpoints.popular('movie'), {}, fetch),
            tmdbFetch(endpoints.topRated('tv'), {}, fetch),
            tmdbFetch(endpoints.upcoming(), {}, fetch),
            fetchLatest('movies', 1, fetch),
            fetchLatest('tvshows', 1, fetch),
            tmdbFetch(endpoints.discover('tv'), {
                with_genres: '16',
                with_original_language: 'ja',
                sort_by: 'popularity.desc'
            }, fetch)
        ]);



        // Enhanced combined list
        const latestRaw = [
            ...(latestVidSrcMovie.result?.slice(0, 10).map((i: any) => ({ ...i, type: 'movie' })) || []),
            ...(latestVidSrcTV.result?.slice(0, 10).map((i: any) => ({ ...i, type: 'tv' })) || [])
        ];

        const enhancedLatest = await Promise.all(
            latestRaw.map(async (item: any) => {
                try {
                    const details = await tmdbFetch(endpoints.details(item.type, item.tmdb_id), {}, fetch);
                    return { ...details, media_type: item.type };
                } catch {
                    return null;
                }
            })
        );

        return {
            trending: trending.results || [],
            popularMovies: popularMovies.results || [],
            topRatedTV: topRatedTV.results || [],
            upcoming: upcoming.results || [],
            popularAnime: popularAnime.results || [],
            latestAdded: enhancedLatest.filter(Boolean)
        };
    } catch (err) {
        console.error('Error loading home page data:', err);
        return {
            trending: [],
            popularMovies: [],
            topRatedTV: [],
            upcoming: [],
            popularAnime: [],
            latestAdded: []
        };
    }
};

