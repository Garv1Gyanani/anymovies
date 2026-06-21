<script lang="ts">
  import MovieCard from '$lib/components/MovieCard.svelte';
  
  let { data } = $props();
  let trending = $derived(data.trending || []);
</script>

<svelte:head>
  <title>Trending This Week - ANYMOVIES</title>
</svelte:head>

<div class="container page-content">
  <section class="section">
    <h1>Trending This Week</h1>
    <p class="subtitle">What everyone is watching right now.</p>
  </section>

  <div class="grid">
    {#each trending as item}
      <MovieCard {item} />
    {/each}
  </div>
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

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
  }

  @media (max-width: 640px) {
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }
  }
</style>
