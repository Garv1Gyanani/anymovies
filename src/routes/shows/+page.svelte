<script lang="ts">
  import MovieCard from '$lib/components/MovieCard.svelte';
  import FilterBar from '$lib/components/FilterBar.svelte';
  
  let { data } = $props();
  let genres = $derived(data.genres || []);
  let popular = $derived(data.popular || []);
  let topRated = $derived(data.topRated || []);
  let filtered = $derived(data.filtered || []);
  let isFiltered = $derived(data.isFiltered || false);
</script>

<svelte:head>
  <title>TV Shows & Web Series - ANYMOVIES</title>
</svelte:head>

<div class="container page-content">
  <section class="section">
    <h1>Web Series & Shows</h1>
    <p class="subtitle">The best series from around the globe.</p>
  </section>

  <FilterBar {genres} />

  {#if isFiltered}
    <section class="section">
      <div class="grid">
        {#each filtered as item}
          <MovieCard item={{...item, media_type: 'tv'}} />
        {/each}
      </div>
      {#if filtered.length === 0}
         <div class="no-results">
            <p>No shows found matching your criteria.</p>
        </div>
      {/if}
    </section>
  {:else}
    <section class="section">
      <h2>Popular Series</h2>
      <div class="grid">
        {#each popular as item}
          <MovieCard item={{...item, media_type: 'tv'}} />
        {/each}
      </div>
    </section>

    <section class="section">
      <h2>Critically Acclaimed</h2>
      <div class="grid">
        {#each topRated as item}
          <MovieCard item={{...item, media_type: 'tv'}} />
        {/each}
      </div>
    </section>
  {/if}
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
  }
  
  .no-results {
      text-align: center;
      padding: 4rem;
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
