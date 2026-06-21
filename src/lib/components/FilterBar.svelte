<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Check, X, Filter, Shuffle } from 'lucide-svelte';

  let { genres = [], type = 'movie' } = $props();

  let selectedGenre = $derived($page.url.searchParams.get('genre') || '');
  let selectedSort = $derived($page.url.searchParams.get('sort') || 'popularity.desc');
  let selectedYear = $derived($page.url.searchParams.get('year') || '');
  let selectedRating = $derived($page.url.searchParams.get('rating') || '');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  function updateFilter(key: string, value: string) {
    const url = new URL($page.url);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    // Reset to page 1 on new filter
    url.searchParams.delete('page');
    goto(url.toString(), { keepFocus: true });
  }

  function clearFilters() {
      const url = new URL($page.url);
      url.searchParams.delete('genre');
      url.searchParams.delete('sort');
      url.searchParams.delete('year');
      url.searchParams.delete('rating');
      url.searchParams.delete('page');
      goto(url.toString());
  }

  function randomMovie() {
    const randomId = Math.floor(Math.random() * 100000) + 1;
    goto(`/${type}/${randomId}`);
  }
</script>

<div class="filter-bar">
  <div class="container filter-content">
    
    <div class="filter-group">
      <span class="label"><Filter size={16} /> Genre:</span>
      <select 
        value={selectedGenre} 
        onchange={(e) => updateFilter('genre', e.currentTarget.value)}
      >
        <option value="">All Genres</option>
        {#each genres as g}
          <option value={g.id.toString()}>{g.name}</option>
        {/each}
      </select>
    </div>

    <div class="filter-group">
      <span class="label">Year:</span>
      <select 
        value={selectedYear} 
        onchange={(e) => updateFilter('year', e.currentTarget.value)}
      >
        <option value="">All Years</option>
        {#each years as year}
          <option value={year.toString()}>{year}</option>
        {/each}
      </select>
    </div>

    <div class="filter-group">
      <span class="label">Rating:</span>
      <select 
        value={selectedRating} 
        onchange={(e) => updateFilter('rating', e.currentTarget.value)}
      >
        <option value="">All Ratings</option>
        <option value="9">9+ Stars</option>
        <option value="8">8+ Stars</option>
        <option value="7">7+ Stars</option>
        <option value="6">6+ Stars</option>
      </select>
    </div>

    <div class="filter-group">
      <span class="label">Sort By:</span>
      <select 
        value={selectedSort} 
        onchange={(e) => updateFilter('sort', e.currentTarget.value)}
      >
        <option value="popularity.desc">Most Popular</option>
        <option value="vote_average.desc">Top Rated</option>
        <option value="primary_release_date.desc">Newest First</option>
        <option value="primary_release_date.asc">Oldest First</option>
      </select>
    </div>

    <button class="random-btn" onclick={randomMovie}>
      <Shuffle size={16} /> Random
    </button>

    {#if selectedGenre || selectedSort !== 'popularity.desc' || selectedYear || selectedRating}
      <button class="clear-btn" onclick={clearFilters}>
        <X size={14} /> Clear
      </button>
    {/if}

  </div>
</div>


<style>
  .filter-bar {
    background: rgba(20, 20, 25, 0.6);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--glass-border);
    position: sticky;
    top: 90px; /* Below header */
    z-index: 900;
    padding: 0.75rem 0;
    margin-bottom: 2rem;
  }

  .filter-content {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    padding: 0.25rem 0.75rem;
    border-radius: 99px;
    border: 1px solid var(--glass-border);
  }

  .label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 500;
  }

  select {
    background: transparent;
    border: none;
    color: white;
    font-family: inherit;
    font-size: 0.9rem;
    cursor: pointer;
    outline: none;
    padding-right: 1rem;
  }

  select option {
    background: #1a1a1a;
    color: white;
  }

  .clear-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--secondary-color);
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
    border-radius: 99px;
    background: rgba(255, 0, 85, 0.1);
    border: 1px solid rgba(255, 0, 85, 0.2);
    transition: all 0.2s;
  }

  .clear-btn:hover {
    background: rgba(255, 0, 85, 0.2);
    transform: translateY(-1px);
  }

  .random-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--primary-color);
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: 99px;
    background: rgba(0, 242, 234, 0.1);
    border: 1px solid rgba(0, 242, 234, 0.3);
    transition: all 0.2s;
    font-weight: 600;
  }

  .random-btn:hover {
    background: rgba(0, 242, 234, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 0 15px var(--primary-glow);
  }


  @media (max-width: 640px) {
    .filter-bar {
      top: 70px; 
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      padding: 0.5rem 0;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }
    
    .filter-content {
      flex-wrap: nowrap;
      padding: 0 1rem;
      gap: 1rem;
    }

    .filter-content::after {
        content: '';
        padding-right: 0.1rem;
    }

    .filter-group {
        flex-shrink: 0;
    }

    .random-btn, .clear-btn {
        flex-shrink: 0;
    }
  }
</style>
