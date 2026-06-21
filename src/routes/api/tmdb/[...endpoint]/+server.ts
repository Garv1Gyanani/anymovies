import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const GET: RequestHandler = async ({ params, url }) => {
    const endpoint = params.endpoint;
    const apiKey = env.TMDB_API_KEY;

    if (!apiKey) {
        return json({ error: 'TMDB_API_KEY is not configured on the server.' }, { status: 500 });
    }

    try {
        const queryParams = new URLSearchParams(url.searchParams);
        queryParams.set('api_key', apiKey);

        const response = await fetch(`${TMDB_BASE_URL}/${endpoint}?${queryParams.toString()}`);

        if (!response.ok) {
            return json({ error: 'Failed to fetch from TMDB' }, { status: response.status });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        console.error('TMDB Proxy Error:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
