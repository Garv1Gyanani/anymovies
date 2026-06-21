<script lang="ts">
  import { Star, Clock, Calendar, Users, Play } from 'lucide-svelte';
  import { endpoints } from '$lib/tmdb';
  import MovieRow from '$lib/components/MovieRow.svelte';
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
  import AdBanner from '$lib/components/AdBanner.svelte';
  import Breadcrumbs, { getBreadcrumbSchema } from '$lib/components/Breadcrumbs.svelte';
  import ShareButton from '$lib/components/ShareButton.svelte';

  let { data } = $props();
  let movie = $derived(data.movie);

  let backdrop = $derived(movie?.backdrop_path ? endpoints.images(movie.backdrop_path, 'original') : '');
  let poster = $derived(movie?.poster_path ? endpoints.images(movie.poster_path, 'w500') : '');
  let year = $derived(movie?.release_date ? new Date(movie.release_date).getFullYear() : 'N/A');
  let rating = $derived(movie?.vote_average ? movie.vote_average.toFixed(1) : '0.0');
  let runtime = $derived(movie?.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A');
  
  let trailer = $derived(movie?.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube'));

  let showPlayer = $state(false);

  let crumbs = $derived([
    { label: 'Movies', href: '/movies' },
    { label: movie.title, href: `/movie/${movie.id}` }
  ]);
  
  let jsonLd = $derived(getBreadcrumbSchema(crumbs, 'https://anymovies.run.place'));
</script>

<svelte:head>
  <title>{movie.title} - ANYMOVIES</title>
  <script type="application/ld+json">
    {@html JSON.stringify(jsonLd)}
  </script>
</svelte:head>

<VideoPlayer 
  type="movie" 
  id={movie.id} 
  show={showPlayer} 
  onClose={() => showPlayer = false} 
/>

<div class="movie-details">
  <div class="backdrop" style="--bg-url: url({backdrop})">
    <div class="backdrop-overlay"></div>
  </div>

  <div class="container main-content">
    <Breadcrumbs {crumbs} />
    
    <div class="top-section">
      <div class="poster-container">

        <img src={poster} alt={movie.title} class="poster" />
        
        <div class="action-buttons">
          <button class="btn-watch" onclick={() => showPlayer = true}>
            <Play fill="currentColor" size={20} />
            Watch Now
          </button>

          {#if trailer}
            <a href="https://www.youtube.com/watch?v={trailer.key}" target="_blank" class="btn-trailer">
              Watch Trailer
            </a>
          {/if}

          <ShareButton title={movie.title} url={`/movie/${movie.id}`} />
        </div>

      </div>

      <div class="info-container">
        <div class="meta">
          <span class="rating">
            <Star size={16} fill="currentColor" /> {rating}
          </span>
          <span class="divider">|</span>
          <span class="year"><Calendar size={16} /> {year}</span>
          <span class="divider">|</span>
          <span class="duration"><Clock size={16} /> {runtime}</span>
        </div>

        <h1>{movie.title}</h1>
        
        <div class="genres">
          {#each movie.genres as genre}
            <span class="genre-tag">{genre.name}</span>
          {/each}
        </div>

        <p class="tagline">{movie.tagline}</p>
        
        <div class="overview-section">
          <h3>Overview</h3>
          <p>{movie.overview}</p>
        </div>

        <div class="crew-grid">
          {#each movie.credits?.crew?.filter(c => ['Director', 'Screenplay', 'Writer'].includes(c.job)).slice(0, 3) as person}
            <div class="crew-item">
              <span class="name">{person.name}</span>
              <span class="job">{person.job}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <section class="cast-section">
      <h2>Top Billed Cast</h2>
      <div class="cast-scroll">
        {#each movie.credits?.cast?.slice(0, 10) as actor}
          <div class="actor-card">
            <img src={actor.profile_path ? endpoints.images(actor.profile_path, 'w185') : 'https://via.placeholder.com/185x278?text=No+Photo'} alt={actor.name} />
            <div class="actor-info">
              <h4>{actor.name}</h4>
              <p>{actor.character}</p>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <AdBanner type="banner" slotId="movie-details-footer" />

    {#if movie.similar?.results?.length > 0}
      <MovieRow title="More Like This" items={movie.similar.results} />
    {/if}
  </div>
</div>

<style>
  .movie-details {
    position: relative;
    padding-bottom: 4rem;
  }

  .backdrop {
    height: 60vh;
    background-image: var(--bg-url);
    background-size: cover;
    background-position: center 20%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }

  .backdrop-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(5, 5, 5, 0.4) 0%, rgba(5, 5, 5, 1) 100%);
  }

  .main-content {
    padding-top: 30vh;
  }

  .top-section {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 4rem;
    margin-bottom: 4rem;
  }

  .poster-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .poster {
    width: 100%;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    border: 1px solid var(--glass-border);
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .btn-watch {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    background: var(--primary-color);
    color: white;
    padding: 1rem;
    border-radius: 12px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 15px var(--primary-glow);
  }

  .btn-watch:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px var(--primary-glow);
    filter: brightness(1.1);
  }

  .btn-trailer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    color: white;
    padding: 0.8rem;
    border-radius: 12px;
    font-weight: 600;
    transition: all 0.2s;
    border: 1px solid var(--glass-border);
  }

  .btn-trailer:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .info-container h1 {
    font-size: 3.5rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
    line-height: 1.1;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  .meta span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .rating {
    color: var(--primary-color);
  }

  .divider {
    opacity: 0.3;
  }

  .genres {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .genre-tag {
    background: rgba(255, 255, 255, 0.05);
    padding: 0.4rem 1rem;
    border-radius: 8px;
    border: 1px solid var(--glass-border);
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  .tagline {
    font-size: 1.25rem;
    font-style: italic;
    color: var(--primary-color);
    margin-bottom: 2rem;
    opacity: 0.8;
  }

  .overview-section h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .overview-section p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-secondary);
    max-width: 800px;
    margin-bottom: 2rem;
  }

  .crew-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 2rem;
  }

  .crew-item {
    display: flex;
    flex-direction: column;
  }

  .crew-item .name {
    font-weight: bold;
    font-size: 1rem;
  }

  .crew-item .job {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .cast-section {
    margin-bottom: 4rem;
  }

  .cast-section h2 {
    margin-bottom: 2rem;
  }

  .cast-scroll {
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    padding-bottom: 1rem;
    scrollbar-width: thin;
  }

  .actor-card {
    width: 150px;
    flex-shrink: 0;
    background: var(--surface-color);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--glass-border);
  }

  .actor-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .actor-info {
    padding: 1rem;
  }

  .actor-info h4 {
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  .actor-info p {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  @media (max-width: 1024px) {
    .top-section {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .poster-container {
      max-width: 260px;
      margin: 0 auto;
    }
    .info-container {
      text-align: center;
    }
    .meta {
      justify-content: center;
      gap: 1rem;
      font-size: 0.9rem;
    }
    .genres {
      justify-content: center;
    }
    .crew-grid {
      justify-content: center;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
    .info-container h1 {
      font-size: 2.2rem;
    }
    .main-content {
      padding-top: 20vh;
    }
    .backdrop {
      height: 50vh;
    }
  }

  @media (max-width: 640px) {
    .info-container h1 {
      font-size: 1.8rem;
    }
    .meta {
        flex-wrap: wrap;
    }
    .tagline {
        font-size: 1.1rem;
    }
    .overview-section p {
        font-size: 1rem;
        line-height: 1.6;
    }
  }
</style>
