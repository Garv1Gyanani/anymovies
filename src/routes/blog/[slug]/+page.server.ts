
import { blogPosts } from '$lib/blog_data';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);

    if (!post) {
        throw error(404, 'Blog post not found');
    }

    return {
        post
    };
};
