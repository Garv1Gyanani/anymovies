<script lang="ts">
  import { Play, Info, Star } from 'lucide-svelte';
  import { endpoints } from '$lib/tmdb';

  let { movie } = $props();

  let title = $derived(movie?.title || movie?.name || 'Untitled');
  let backdrop = $derived(movie?.backdrop_path ? endpoints.images(movie.backdrop_path, 'original') : '');
</script>

<section class="hero" style="--bg-url: url({backdrop})">
  <div class="overlay"></div>
  <div class="container hero-content">
    <div class="badge">
        <Star size={14} fill="currentColor" />
        <span>Featured Content</span>
    </div>
    <h1>{title}</h1>
    <p class="overview">{movie.overview}</p>
    <div class="actions">
      <button class="btn btn-primary">
        <Play fill="currentColor" size={20} />
        Watch Trailer
      </button>
      <button class="btn btn-secondary">
        <Info size={20} />
        More Info
      </button>
    </div>
  </div>
</section>

<style>
  .hero {
    height: 90vh;
    min-height: 650px;
    background-image: var(--bg-url);
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    align-items: center;
    margin-top: -80px;
  }

  /* Cinematic overlay with smoother gradient steps */
  .overlay {
    position: absolute;
    inset: 0;
    background: 
      linear-gradient(to right, rgba(3, 3, 3, 0.95) 0%, rgba(3, 3, 3, 0.8) 30%, rgba(3, 3, 3, 0.2) 70%, rgba(3, 3, 3, 0.1) 100%),
      linear-gradient(to top, var(--bg-color) 0%, rgba(3, 3, 3, 0.6) 20%, transparent 50%);
  }

  .hero-content {
    position: relative;
    z-index: 10;
    max-width: 900px;
    padding-top: 4rem;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: rgba(0, 242, 234, 0.15);
    color: var(--primary-color);
    padding: 0.5rem 1.25rem;
    border-radius: 99px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(0, 242, 234, 0.3);
    box-shadow: 0 0 20px rgba(0, 242, 234, 0.1);
    backdrop-filter: blur(8px);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  h1 {
    font-size: 4.5rem;
    font-weight: 900;
    line-height: 1.05;
    margin-bottom: 1.5rem;
    letter-spacing: -2px;
    text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    background: linear-gradient(180deg, #fff 0%, #ccc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .overview {
    font-size: 1.25rem;
    line-height: 1.6;
    color: #d1d5db;
    margin-bottom: 3rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-width: 650px;
    text-shadow: 0 2px 10px rgba(0,0,0,0.8);
  }

  .actions {
    display: flex;
    gap: 1.25rem;
  }

  .btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2.5rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1.1rem;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    position: relative;
    overflow: hidden;
  }

  .btn-primary {
    background: var(--primary-color);
    color: #000;
  }

  .btn-primary:hover {
    background: #fff;
    box-shadow: 0 0 35px var(--primary-glow), 0 0 15px var(--primary-color);
    transform: translateY(-2px);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.8rem;
    }
    .overview {
      font-size: 1rem;
      max-width: 100%;
    }
    .hero {
      height: 75vh;
      min-height: auto;
    }
    .badge {
      font-size: 0.75rem;
      padding: 0.4rem 1rem;
    }
    .btn {
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
    }
  }
</style>

