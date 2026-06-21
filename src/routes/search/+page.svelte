<script lang="ts">
  import MovieCard from '$lib/components/MovieCard.svelte';
  
  let { data } = $props();
  let results = $derived(data.results || []);
  let query = $derived(data.query || '');
</script>

<svelte:head>
  <title>Search results for "{query}" - ANYMOVIES</title>
</svelte:head>

<div class="container page-content">
  <section class="section">
    <h1>Search Results</h1>
    {#if query}
      <p class="subtitle">Showing results for "<strong>{query}</strong>"</p>
    {:else}
      <p class="subtitle">Please enter a search term.</p>
    {/if}
  </section>

  {#if results.length > 0}
    <div class="grid">
      {#each results.filter(r => r.media_type === 'movie' || r.media_type === 'tv') as item}
        <MovieCard {item} />
      {/each}
    </div>
  {:else if query}
    <div class="no-results">
        <p>No results found for "{query}". Try searching for something else.</p>
    </div>
  {/if}
</div>

<style>
  .page-content {
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .section {
    margin-bottom: 4rem;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: var(--text-secondary);
    font-size: 1.2rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
  }

  .no-results {
    text-align: center;
    padding: 4rem 0;
    color: var(--text-secondary);
    font-size: 1.2rem;
  }

  @media (max-width: 640px) {
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }
  }
</style>
