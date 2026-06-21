<script lang="ts">
  import { blogPosts } from '$lib/blog_data';

  // Sort posts by date descending
  let posts = blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
</script>

<svelte:head>
  <title>Blog - ANYMOVIES News & Guides</title>
  <meta name="description" content="Read the latest news, guides, and updates about free movie streaming, anime, and TV shows.">
</svelte:head>

<div class="container page-content">
  <section class="section">
    <h1>Latest News & Updates</h1>
    <p class="subtitle">Guides, reviews, and lists for the best streaming experience.</p>
  </section>

  <div class="grid">
    {#each posts as post}
      <a href="/blog/{post.slug}" class="card">
        {#if post.image}
          <div class="card-image">
            <img src={post.image} alt={post.title} loading="lazy" />
            <div class="overlay"></div>
          </div>
        {/if}
        <div class="card-content">
          <div class="meta-top">
            <span class="date">{post.date}</span>
            <span class="tags">
                {#each post.tags.slice(0, 2) as tag}
                <span class="tag">#{tag}</span>
                {/each}
            </span>
          </div>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
      </a>
    {/each}

  </div>
</div>

<style>
  .page-content {
      padding-top: 130px;
      padding-bottom: 4rem;
  }

  .section {
      margin-bottom: 3rem;
  }

  h1 {
      font-size: 3rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(180deg, #fff 0%, #ccc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
  }

  .subtitle {
      color: var(--text-secondary);
      font-size: 1.2rem;
  }

  .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
  }

  .card {
      display: flex;
      flex-direction: column;
      background: var(--surface-color);
      border: 1px solid var(--glass-border);
      border-radius: 16px;
      overflow: hidden;
      text-decoration: none;
      color: inherit;
      transition: all 0.3s ease;
      position: relative;
  }

  .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      border-color: var(--glass-highlight);
  }

  .card-image {
      position: relative;
      height: 200px;
      overflow: hidden;
  }

  .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
  }

  .card:hover .card-image img {
      transform: scale(1.05);
  }

  .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8));
  }

  .card-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      height: 100%;
      justify-content: space-between;
  }

  .meta-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
  }

  .date {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
  }

  h2 {
      font-size: 1.25rem;
      line-height: 1.4;
      margin: 0;
      color: var(--text-primary);
      font-weight: 700;
  }

  p {
      color: var(--text-secondary);
      font-size: 0.9rem;
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
  }

  .tags {
      display: flex;
      gap: 0.5rem;
  }

  .tag {
      font-size: 0.7rem;
      color: var(--primary-color);
      background: rgba(0, 242, 234, 0.1);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-weight: 600;
  }

  @media (max-width: 640px) {
      .grid {
          grid-template-columns: 1fr;
      }
      
      h1 {
          font-size: 2.2rem;
      }
      .card-image {
          height: 180px;
      }
  }

</style>
