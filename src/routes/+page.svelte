<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import MovieRow from '$lib/components/MovieRow.svelte';
  import AdBanner from '$lib/components/AdBanner.svelte';
  
  let { data } = $props();
  let trending = $derived(data.trending || []);
  let popularMovies = $derived(data.popularMovies || []);
  let topRatedTV = $derived(data.topRatedTV || []);
  let upcoming = $derived(data.upcoming || []);
  let popularAnime = $derived(data.popularAnime || []);
  let latestAdded = $derived(data.latestAdded || []);

  
  // Choose a random trending item for the hero
  let heroItem = $derived(trending.length > 0 ? trending[Math.floor(Math.random() * Math.min(trending.length, 5))] : null);
</script>

<svelte:head>
  <title>ANYMOVIES - Watch Free Movies, TV Shows & Anime Online HD</title>
  <meta name="description" content="Stream thousands of movies and TV shows online for free in HD quality. No registration required. Watch the latest releases on ANYMOVIES." />
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "ANYMOVIES",
      "url": "https://www.anymovies.run.place/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.anymovies.run.place/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  </script>
</svelte:head>


{#if heroItem}
  <Hero movie={heroItem} />
{/if}

<div class="content">
  <MovieRow title="Recently Added" items={latestAdded} />
  <MovieRow title="Trending Today" items={trending} />
  
  <AdBanner type="banner" slotId="home-top-banner" />

  <MovieRow title="Popular Movies" items={popularMovies} />
  <MovieRow title="Top Rated Series" items={topRatedTV} />
  <MovieRow title="Popular Anime" items={popularAnime.map(i => ({...i, media_type: 'tv'}))} />

  
  <section class="banner container">
    <div class="banner-content">
      <h2>Experience ANYMOVIES on all your devices</h2>
      <p>Watch anywhere, anytime. Sync your watchlist across all platforms.</p>
      <button class="btn-join">Get Started Now</button>
    </div>
  </section>

  <MovieRow title="Upcoming Releases" items={upcoming} />

  <section class="seo-text container">
    <h3>Free Movies Online - Watch HD Movies & TV Shows</h3>
    <p>
      ANYMOVIES is your best destination to <strong>watch movies online free</strong>. We offer a massive library of over 20,000 titles including the latest blockbusters, TV shows, and Anime series. Unlike other sites, we provide:
    </p>
    <ul>
      <li><strong>No Sign Up:</strong> Start streaming instantly without creating an account.</li>
      <li><strong>HD Quality:</strong> Enjoy 1080p and 4K content with crystal clear audio.</li>
      <li><strong>Fast Servers:</strong> No buffering or lag, even on slow connections.</li>
      <li><strong>Mobile Friendly:</strong> Optimized for iPhone, Android, and Tablets.</li>
    </ul>
    <p>
      Whether you are looking for action, romance, horror, or the latest <em>One Piece</em> episodes, we have it all. This site is a safe alternative to 123Movies, Fmovies, Putlocker, and SolarMovie. Bookmark us today!
    </p>
  </section>
</div>


<style>
  .content {
    margin-top: -100px;
    padding-bottom: 4rem;
  }

  .banner {
    background: linear-gradient(135deg, #1a1a1a 0%, #050505 100%);
    border-radius: 24px;
    padding: 4rem;
    margin: 4rem auto;
    border: 1px solid var(--glass-border);
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .banner::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
    opacity: 0.1;
  }

  .banner-content {
    position: relative;
    z-index: 1;
  }

  .banner h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .banner p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    font-size: 1.2rem;
  }

  .btn-join {
    background: white;
    color: black;
    padding: 1rem 3rem;
    border-radius: 12px;
    font-weight: bold;
    font-size: 1.1rem;
    transition: all 0.2s;
  }

  .btn-join:hover {
    background: var(--primary-color);
    box-shadow: 0 0 30px var(--primary-glow);
  }

  @media (max-width: 768px) {
    .banner {
      padding: 2rem;
    }
    .banner h2 {
      font-size: 1.8rem;
    }
  }

  .seo-text {
    margin-top: 4rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .seo-text h3 {
    font-size: 1.5rem;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .seo-text ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  .seo-text li {
    margin-bottom: 0.5rem;
  }

</style>
