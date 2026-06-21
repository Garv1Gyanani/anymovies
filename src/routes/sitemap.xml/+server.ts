
import { blogPosts } from '$lib/blog_data';

export async function GET() {
    const site = 'https://www.anymovies.run.place';
    const pages = [
        '',
        '/movies',
        '/shows',
        '/trending',
        '/anime',
        '/blog'
    ];

    const blogUrls = blogPosts.map(post => `/blog/${post.slug}`);

    // Combine main pages and blog posts
    const allPages = [...pages, ...blogUrls];

    const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
  ${allPages
            .map(
                (page) => `
  <url>
    <loc>${site}${page}</loc>
    <changefreq>${page.includes('/blog/') ? 'monthly' : 'daily'}</changefreq>
    <priority>${page === '' ? '1.0' : page.includes('/blog/') ? '0.6' : '0.8'}</priority>
  </url>
  `
            )
            .join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
}
