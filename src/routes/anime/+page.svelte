<script lang="ts">
  import MovieCard from '$lib/components/MovieCard.svelte';
  
  let { data } = $props();
  let popularShows = $derived(data.popularShows || []);
  let popularMovies = $derived(data.popularMovies || []);
  let topRatedShows = $derived(data.topRatedShows || []);
</script>

<svelte:head>
  <title>Anime - ANYMOVIES</title>
</svelte:head>

<div class="container page-content">
  <section class="section">
    <h1>Anime World</h1>
    <p class="subtitle">Explore the best of Japanese Animation.</p>
  </section>

  <section class="section">
    <h2>Popular Series</h2>
    <div class="grid">
      {#each popularShows as item}
        <MovieCard item={{...item, media_type: 'tv'}} />
      {/each}
    </div>
  </section>

  <section class="section">
    <h2>Anime Movies</h2>
    <div class="grid">
      {#each popularMovies as item}
        <MovieCard item={{...item, media_type: 'movie'}} />
      {/each}
    </div>
  </section>

  <section class="section">
    <h2>Top Rated Classics</h2>
    <div class="grid">
      {#each topRatedShows as item}
        <MovieCard item={{...item, media_type: 'tv'}} />
      {/each}
    </div>
  </section>
</div>

<style>
  .page-content {
    padding-top: 130px;
    padding-bottom: 4rem;
  }


  .section {
    margin-bottom: 4rem;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #ff6b6b, #fca311);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    color: var(--text-secondary);
    font-size: 1.2rem;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: var(--primary-color);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
    overflow-x: auto;
    padding-bottom: 1rem;
  }

  /* Custom scrollbar for horizontal grid if needed, 
     but here we use standard grid. For anime, let's keep it consistent. */

  @media (max-width: 640px) {
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }
  }
</style>
