const TMDB_API_BASE = 'https://api.themoviedb.org/3';

export async function tmdbFetch(endpoint: string, params: Record<string, string> = {}, fetcher = fetch) {
    // Using relative path for SvelteKit fetcher to handle both server (internal) and client requests


    const queryParams = new URLSearchParams(params);
    const response = await fetcher(`/api/tmdb${endpoint}?${queryParams.toString()}`);

    if (!response.ok) {
        throw new Error(`TMDB fetch failed: ${response.statusText}`);
    }

    return await response.json();
}

export const endpoints = {
    trending: (type: 'movie' | 'tv' | 'all', window: 'day' | 'week') => `/trending/${type}/${window}`,
    popular: (type: 'movie' | 'tv') => `/${type}/popular`,
    topRated: (type: 'movie' | 'tv') => `/${type}/top_rated`,
    upcoming: () => `/movie/upcoming`,
    details: (type: 'movie' | 'tv', id: string) => `/${type}/${id}`,
    search: (type: 'movie' | 'tv' | 'multi') => `/search/${type}`,
    genres: (type: 'movie' | 'tv') => `/genre/${type}/list`,
    discover: (type: 'movie' | 'tv') => `/discover/${type}`,
    images: (path: string, size: string = 'original') => `https://image.tmdb.org/t/p/${size}${path}`
};

