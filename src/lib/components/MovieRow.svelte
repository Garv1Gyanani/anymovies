<script lang="ts">
  import MovieCard from './MovieCard.svelte';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';

  let { title, items = [] } = $props();
  let scrollContainer: HTMLDivElement;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer) {
      const amount = direction === 'left' ? -500 : 500;
      scrollContainer.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };
</script>

<section class="row-section">
  <div class="container">
    <div class="row-header">
      <h2>{title}</h2>
      <div class="controls">
        <button onclick={() => scroll('left')} aria-label="Scroll Left"><ChevronLeft size={24} /></button>
        <button onclick={() => scroll('right')} aria-label="Scroll Right"><ChevronRight size={24} /></button>
      </div>
    </div>
    
    <div class="scroll-container" bind:this={scrollContainer}>
      {#each items as item}
        <MovieCard {item} />
      {/each}
    </div>
  </div>
</section>

<style>
  .row-section {
    margin-bottom: 4rem;
  }

  .row-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    position: relative;
    padding-left: 1rem;
  }

  h2::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--primary-color);
    border-radius: 4px;
    box-shadow: 0 0 10px var(--primary-glow);
  }

  .controls {
    display: flex;
    gap: 0.5rem;
  }

  .controls button {
    background: var(--surface-color);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--glass-border);
    transition: all 0.2s;
  }

  .controls button:hover {
    background: var(--primary-color);
    color: black;
    border-color: var(--primary-color);
  }

  .scroll-container {
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    padding: 1rem 0 2rem;
    scrollbar-width: none; /* Firefox */
  }

  .scroll-container::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }
</style>
