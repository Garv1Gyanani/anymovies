<script lang="ts">
  import { Star, PlayCircle } from 'lucide-svelte';
  import { endpoints } from '$lib/tmdb';

  let { item } = $props();
  
  let title = $derived(item.title || item.name || 'Untitled');
  let date = $derived(item.release_date || item.first_air_date);
  let year = $derived(date ? new Date(date).getFullYear() : 'N/A');
  let rating = $derived(item.vote_average ? item.vote_average.toFixed(1) : '0.0');
  let poster = $derived(item.poster_path ? endpoints.images(item.poster_path, 'w500') : 'https://via.placeholder.com/500x750?text=No+Poster');
</script>

<a href="/{item.media_type || 'movie'}/{item.id}" class="card">
  <div class="image-container">
    <img src={poster} alt={title} loading="lazy" />
    <div class="overlay">
      <PlayCircle size={48} color="white" />
    </div>
    <div class="rating">
      <Star size={14} fill="currentColor" /> {rating}
    </div>
  </div>
  <div class="info">
    <h3>{title}</h3>
    <p>{year} • {item.media_type === 'tv' ? 'Series' : 'Movie'}</p>
  </div>
</a>

<style>
  .card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    width: 200px;
    flex-shrink: 0;
    position: relative;
    border-radius: 16px;
  }

  .card:hover {
    transform: translateY(-8px) scale(1.02);
    z-index: 10;
  }

  .image-container {
    position: relative;
    aspect-ratio: 2/3;
    border-radius: 16px;
    overflow: hidden;
    background: var(--surface-color);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    border: 1px solid var(--glass-border);
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .card:hover img {
    transform: scale(1.1);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    backdrop-filter: blur(2px);
  }

  .card:hover .overlay {
    opacity: 1;
  }

  .rating {
    position: absolute;
    top: 12px;
    right: 12px;
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    padding: 4px 10px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--primary-color);
    display: flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--glass-highlight);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }

  .info {
    padding: 0 0.5rem;
  }

  .info h3 {
    font-size: 1.05rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-primary);
    margin-bottom: 0.2rem;
  }

  .info p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    font-weight: 500;
  }

  @media (max-width: 640px) {
    .card {
      width: 160px;
    }
    .info h3 {
      font-size: 0.95rem;
    }
  }
</style>

