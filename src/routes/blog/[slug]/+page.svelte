<script lang="ts">
  let { data } = $props();
  let post = $derived(data.post);
</script>

<svelte:head>
  <title>{post.title} - ANYMOVIES Blog</title>
  <meta name="description" content={post.excerpt}>
  <meta property="og:title" content={post.title}>
  <meta property="og:description" content={post.excerpt}>
  <meta property="og:type" content="article">
  <meta property="article:published_time" content={post.date}>
</svelte:head>

<div class="container page-content">
  <article class="blog-post">
    <header>
      <div class="meta">
        <span class="date">{post.date}</span>
        <span class="tags">
          {#each post.tags as tag}
            <span class="tag">#{tag}</span>
          {/each}
        </span>
      </div>
      <h1>{post.title}</h1>
      <p class="excerpt">{post.excerpt}</p>
    </header>

    <div class="content">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html post.content}
    </div>

    <div class="back-link">
      <a href="/blog">← Back to Blog</a>
    </div>
  </article>
</div>

<style>
  .page-content {
      padding-top: 130px;
      padding-bottom: 4rem;
      max-width: 800px;
      margin: 0 auto;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
  }

  .blog-post {
      background: var(--surface-color);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      padding: 3rem;
      box-shadow: 0 10px 40px rgba(0,0,0,0.4);
  }

  header {
      margin-bottom: 3rem;
      border-bottom: 1px solid var(--glass-border);
      padding-bottom: 2rem;
  }

  .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
      color: var(--text-muted);
  }

  .tags {
      display: flex;
      gap: 0.5rem;
  }

  .tag {
      color: var(--primary-color);
      background: rgba(0, 242, 234, 0.1);
      padding: 0.2rem 0.6rem;
      border-radius: 99px;
  }

  h1 {
      font-size: 2.5rem;
      line-height: 1.2;
      margin-bottom: 1rem;
      background: linear-gradient(180deg, #fff 0%, #ccc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
  }

  .excerpt {
      font-size: 1.2rem;
      color: var(--text-secondary);
      line-height: 1.6;
  }

  .content {
      color: var(--text-primary);
      line-height: 1.8;
      font-size: 1.1rem;
  }

  /* Typography for injected HTML content */
  :global(.content h2) {
      font-size: 1.8rem;
      color: var(--primary-color);
      margin-top: 2.5rem;
      margin-bottom: 1rem;
  }

  :global(.content p) {
      margin-bottom: 1.5rem;
  }

  :global(.content ul, .content ol) {
      margin-bottom: 1.5rem;
      padding-left: 2rem;
  }

  :global(.content li) {
      margin-bottom: 0.5rem;
  }

  :global(.content strong) {
      color: #fff;
  }

  .back-link {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid var(--glass-border);
  }

  .back-link a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
  }

  .back-link a:hover {
      text-decoration: underline;
  }

  @media (max-width: 640px) {
      .blog-post {
          padding: 1.5rem;
      }
      h1 {
          font-size: 2rem;
      }
  }
</style>
