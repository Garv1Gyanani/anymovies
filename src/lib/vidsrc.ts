export const VIDSRC_BASE_URL = 'https://vidsrc-embed.ru';

export async function fetchLatest(type: 'movies' | 'tvshows' | 'episodes', page: number = 1, fetcher = fetch) {
    try {
        const response = await fetcher(`${VIDSRC_BASE_URL}/${type}/latest/page-${page}.json`);
        if (!response.ok) throw new Error(`Failed to fetch latest ${type}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching latest ${type}:`, error);
        return [];
    }
}

export type Provider = 'vidsrc.ru' | 'vidsrc.me' | 'vidsrc.pro' | 'superembed';

export function getEmbedUrl(
    type: 'movie' | 'tv',
    id: string | number,
    season: number = 1,
    episode: number = 1,
    provider: Provider = 'vidsrc.ru',
    isDub: boolean = false
) {
    if (provider === 'superembed') {
        const base = 'https://multiembed.mov/directstream.php';
        const params = new URLSearchParams({
            video_id: id.toString(),
            tmdb: '1'
        });
        if (type === 'tv') {
            params.set('s', season.toString());
            params.set('e', episode.toString());
        }
        return `${base}?${params.toString()}`;
    }

    if (provider === 'vidsrc.me') {
        const base = 'https://vidsrc.me/embed';
        const dubSuffix = isDub ? '/dub' : '';
        if (type === 'movie') {
            return `${base}/movie/${id}${dubSuffix}`;
        }
        return `${base}/tv/${id}/${season}-${episode}${dubSuffix}`;
    }

    if (provider === 'vidsrc.pro') {
        const base = 'https://vidsrc.pro/embed';
        if (type === 'movie') {
            return `${base}/movie/${id}${isDub ? '?audio=en' : ''}`;
        }
        return `${base}/tv/${id}/${season}/${episode}${isDub ? '?audio=en' : ''}`;
    }

    // Default: vidsrc.ru (vidsrc-embed.ru)
    const base = 'https://vidsrc-embed.ru/embed';
    if (type === 'movie') {
        return `${base}/movie/${id}`;
    }
    return `${base}/tv/${id}/${season}-${episode}`;
}


