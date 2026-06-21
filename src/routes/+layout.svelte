<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Search, Home, Clapperboard, Monitor, TrendingUp, Sparkles, Newspaper, Sun, Moon } from 'lucide-svelte';
  import { theme } from '$lib/stores/theme';

  
  let { children } = $props();
  let scrolled = $state(false);
  let searchQuery = $state('');

  const handleSearch = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      goto(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  onMount(() => {
    theme.init();
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<header class:scrolled>
  <div class="container nav-container">
    <a href="/" class="logo">
      <span class="any">ANY</span><span class="movies">MOVIES</span>
    </a>
    
    <nav>
      <a href="/"><Home size={20} /> <span>Home</span></a>
      <a href="/movies"><Clapperboard size={20} /> <span>Movies</span></a>
      <a href="/shows"><Monitor size={20} /> <span>Web Series</span></a>
      <a href="/anime"><Sparkles size={20} /> <span>Anime</span></a>
      <a href="/trending"><TrendingUp size={20} /> <span>Trending</span></a>
      <a href="/blog"><Newspaper size={20} /> <span>Blog</span></a>
    </nav>
    
    <div class="header-actions">
      <div class="search-bar">
        <Search size={18} />
        <input 
          type="text" 
          placeholder="Search movies, series..." 
          bind:value={searchQuery}
          onkeydown={handleSearch}
        />
      </div>
      
      <button class="theme-toggle" onclick={() => theme.toggle()} aria-label="Toggle theme">
        {#if $theme === 'dark'}
          <Sun size={20} />
        {:else}
          <Moon size={20} />
        {/if}
      </button>
    </div>
  </div>
</header>

<main>
  {@render children()}
</main>

<footer>
  <div class="container footer-content">
    <div class="footer-brand">
      <div class="logo">
        <span class="any">ANY</span><span class="movies">MOVIES</span>
      </div>
      <p>Your ultimate destination for movies and web series. Powered by TMDB.</p>
    </div>
    <div class="footer-links">
      <h4>Platform</h4>
      <a href="/">Home</a>
      <a href="/movies">Movies</a>
      <a href="/shows">TV Shows</a>
      <a href="/anime">Anime</a>
      <a href="/blog">Blog</a>
    </div>
    <div class="footer-links">
      <h4>Support</h4>
      <a href="/about">About Us</a>
      <a href="/contact">Contact</a>
      <a href="/privacy">Privacy Policy</a>
    </div>

  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 ANYMOVIES. All rights reserved.</p>
  </div>
</footer>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 90px;
    display: flex;
    align-items: center;
    z-index: 1000;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-bottom: 1px solid transparent;
    background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%);
  }

  header.scrolled {
    height: 70px;
    background: rgba(10, 10, 12, 0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--glass-border);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  }

  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .logo {
    font-size: 1.75rem;
    font-weight: 900;
    letter-spacing: -1px;
    display: flex;
    align-items: center;
  }

  .any {
    color: var(--text-primary);
  }

  .movies {
    color: var(--primary-color);
    text-shadow: 0 0 20px var(--primary-glow);
  }

  nav {
    display: flex;
    gap: 2.5rem;
    padding: 0.5rem 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 99px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(4px);
  }

  nav a {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 600;
    color: var(--text-secondary);
    transition: all 0.3s ease;
    font-size: 0.95rem;
  }

  nav a:hover {
    color: var(--primary-color);
    transform: translateY(-1px);
    text-shadow: 0 0 10px var(--primary-glow);
  }

  .search-bar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    padding: 0.6rem 1.25rem;
    border-radius: 99px;
    border: 1px solid var(--glass-border);
    width: 300px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .search-bar:focus-within {
    border-color: var(--primary-color);
    background: rgba(0, 0, 0, 0.6);
    box-shadow: 0 0 20px var(--primary-glow);
    width: 320px;
  }

  .search-bar input {
    background: none;
    border: none;
    color: var(--text-primary);
    width: 100%;
    outline: none;
    font-size: 0.95rem;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--primary-color);
    transform: rotate(15deg);
  }


  main {
    min-height: 100vh;
    padding-top: 0; /* Hero takes care of spacing */
  }

  footer {
    background: var(--surface-color);
    padding: 6rem 0 3rem;
    margin-top: 6rem;
    border-top: 1px solid var(--glass-border);
    position: relative;
    overflow: hidden;
  }

  /* Footer gradient glow */
  footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
    opacity: 0.5;
  }

  .footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 5rem;
    margin-bottom: 4rem;
  }

  .footer-brand p {
    color: var(--text-secondary);
    margin-top: 1.5rem;
    max-width: 320px;
    font-size: 1.05rem;
    line-height: 1.7;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .footer-links h4 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: var(--text-primary);
    font-weight: 700;
  }

  .footer-links a {
    color: var(--text-secondary);
    transition: all 0.2s;
    font-size: 0.95rem;
  }

  .footer-links a:hover {
    color: var(--primary-color);
    padding-left: 5px;
  }
  
  /* Mobile Bottom Nav */
  .mobile-nav {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 65px;
    background: rgba(15, 15, 17, 0.95);
    backdrop-filter: blur(20px);
    border-top: 1px solid var(--glass-border);
    z-index: 1001;
    justify-content: space-around;
    align-items: center;
    padding-bottom: env(safe-area-inset-bottom);
  }

  .mobile-nav a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: var(--text-secondary);
    font-size: 0.7rem;
    text-decoration: none;
    width: 100%;
    height: 100%;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .mobile-nav a.active {
    color: var(--primary-color);
  }

  .mobile-nav a.active :global(svg) {
    fill: rgba(0, 242, 234, 0.15); 
  }

  @media (max-width: 640px) {
    header {
      height: 70px;
      padding: 0 0.5rem;
    }

    .mobile-nav {
      display: flex;
    }
    
    header nav {
      display: none;
    }
    
    .logo {
      font-size: 1.4rem;
    }

    .header-actions {
      gap: 0.5rem;
      flex-grow: 1;
      justify-content: flex-end;
    }

    .search-bar {
      width: 40px;
      padding: 0.6rem;
      justify-content: center;
      overflow: hidden;
      border-radius: 50%;
      min-width: 0;
    }

    .search-bar:focus-within {
      position: absolute;
      left: 1rem;
      right: 4rem;
      width: auto;
      max-width: none;
      z-index: 10;
      border-radius: 99px;
      background: var(--surface-color);
    }

    .search-bar input {
      display: none;
    }

    .search-bar:focus-within input {
      display: block;
    }

    .theme-toggle {
      width: 36px;
      height: 36px;
    }

    .footer-content {
      grid-template-columns: 1fr;
      gap: 2.5rem;
      text-align: center;
    }

    .footer-brand p {
      margin: 1rem auto 0;
    }

    .footer-links {
      gap: 0.8rem;
    }

    footer {
      padding: 4rem 0 100px;
      margin-top: 4rem;
    }
  }

</style>

<div class="mobile-nav">

  <a href="/" class:active={$page.url.pathname === '/'}>
    <Home size={24} />
    <span>Home</span>
  </a>
  <a href="/movies" class:active={$page.url.pathname === '/movies'}>
    <Clapperboard size={24} />
    <span>Movies</span>
  </a>
  <a href="/shows" class:active={$page.url.pathname === '/shows'}>
    <Monitor size={24} />
    <span>Shows</span>
  </a>
  <a href="/trending" class:active={$page.url.pathname === '/trending'}>
    <TrendingUp size={24} />
    <span>Hot</span>
  </a>
  <a href="/blog" class:active={$page.url.pathname.startsWith('/blog')}>
    <Newspaper size={24} />
    <span>Blog</span>
  </a>
</div>





