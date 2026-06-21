
<script lang="ts">
  import { Clapperboard, Monitor, Film, TrendingUp, CheckCircle, XCircle, ShieldCheck } from 'lucide-svelte';

  const alternatives = [
      {
          name: "ANYMOVIES",
          url: "https://anymovies.run.place",
          status: "Active",
          ads: "None",
          quality: "4K/HD",
          recommended: true,
          desc: "The best overall experience with no ads, fast servers, and a massive library."
      },
      {
          name: "Tubi TV",
          url: "https://tubitv.com",
          status: "Active (Legal)",
          ads: "High",
          quality: "720p",
          recommended: false,
          desc: "Legal and safe, but requires watching 5-6 unskippable ads per movie. Limited library."
      },
       {
          name: "123Movies (Clones)",
          url: "Various Mirrors",
          status: "Unsafe",
          ads: "Extreme",
          quality: "1080p",
          recommended: false,
          desc: "The original is dead. Most clones are filled with malware and popup ads."
      },
      {
          name: "Braflix",
          url: "braflix.ru",
          status: "Active",
          ads: "Medium",
          quality: "1080p",
          recommended: true,
          desc: "A solid alternative with a good UI, though buffering can be an issue."
      },
      {
          name: "FMovies",
          url: "fmovies.to",
          status: "Blocked Often",
          ads: "High",
          quality: "1080p",
          recommended: false,
          desc: "Great library, but constantly changes domains and has aggressive popups."
      },
      {
          name: "SolarMovie",
          url: "solarmovie.pe",
          status: "Active",
          ads: "Medium",
          quality: "HD",
          recommended: false,
          desc: "Good for older movies, but new releases are often cam-rips."
      }
  ];
</script>

<svelte:head>
  <title>Top 10 Best Free Movie Streaming Sites (2026 Alternatives)</title>
  <meta name="description" content="Looking for sites like 123Movies or FMovies? Here are the top 10 best free movie streaming sites in 2026 that are safe, fast, and work on mobile." />
</svelte:head>

<div class="container page-content">
  <div class="header">
      <h1>Top 10 Best Free Movie Streaming Sites in 2026</h1>
      <p>We tested over 50 sites to find the safest, fastest places to watch free movies online.</p>
  </div>

  <div class="comparison-table">
      <div class="table-header">
          <span>Site Name</span>
          <span class="desktop-only">Ads</span>
          <span class="desktop-only">Quality</span>
          <span>Status</span>
      </div>
      
      {#each alternatives as site}
          <div class="table-row" class:recommended={site.recommended}>
              <div class="col-name">
                  <h3>{site.name}</h3>
                  {#if site.recommended}
                      <span class="badge">Recommended</span>
                  {/if}
                  <p class="mobile-desc">{site.desc}</p>
              </div>
              <div class="col desktop-only">{site.ads}</div>
              <div class="col desktop-only">{site.quality}</div>
              <div class="col-status">
                  {#if site.status.includes('Active')}
                      <span class="status active"><CheckCircle size={16}/> {site.status}</span>
                  {:else}
                      <span class="status warning"><XCircle size={16}/> {site.status}</span>
                  {/if}
              </div>
          </div>
          <div class="row-desc desktop-only">
              <p>{site.desc}</p>
          </div>
      {/each}
  </div>

  <section class="seo-content">
      <h2>Why ANYMOVIES is the Best 123Movies Alternative</h2>
      <p>
          When the original 123Movies was shut down, millions of users were left looking for a new home. 
          While many sites popped up, most are filled with dangerous ads.
      </p>
      <p>
          <strong>ANYMOVIES</strong> was built to be different. We focus on:
      </p>
      <ul>
          <li><ShieldCheck size={18} inline /> <strong>Safety:</strong> No malicious popups or redirects.</li>
          <li><Film size={18} inline /> <strong>Library:</strong> Over 20,000 movies and TV shows.</li>
          <li><Monitor size={18} inline /> <strong>Quality:</strong> Always HD, never cam-rips (unless clearly marked).</li>
      </ul>
  </section>
</div>

<style>
  .page-content {
      padding-top: 2rem;
      padding-bottom: 4rem;
  }

  .header {
      text-align: center;
      margin-bottom: 3rem;
  }

  .header h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      background: linear-gradient(to right, #fff, var(--primary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
  }

  .header p {
      color: var(--text-secondary);
      font-size: 1.1rem;
  }

  .comparison-table {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 16px;
      padding: 1rem;
      border: 1px solid var(--glass-border);
      margin-bottom: 3rem;
  }

  .table-header {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      padding: 1rem;
      border-bottom: 1px solid var(--glass-border);
      font-weight: bold;
      color: var(--text-muted);
      text-transform: uppercase;
      font-size: 0.85rem;
  }

  .table-row {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      padding: 1.5rem 1rem;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  }

  .table-row.recommended {
      background: rgba(0, 242, 234, 0.05);
      border-left: 3px solid var(--primary-color);
  }

  .col-name h3 {
      font-size: 1.2rem;
      margin: 0;
      color: var(--text-primary);
  }

  .badge {
      font-size: 0.7rem;
      background: var(--primary-color);
      color: black;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: bold;
      margin-left: 8px;
      vertical-align: middle;
  }

  .status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.9rem;
  }

  .status.active { color: #4ade80; }
  .status.warning { color: #f87171; }

  .row-desc {
      padding: 0 1rem 1rem 1rem;
      color: var(--text-secondary);
      font-size: 0.9rem;
      border-bottom: 1px solid var(--glass-border);
  }

  .seo-content {
      margin-top: 4rem;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
  }

  .seo-content h2 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
  }

  .seo-content p {
      line-height: 1.7;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
  }

  .seo-content ul {
      list-style: none;
      padding: 0;
  }

  .seo-content li {
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 10px;
  }

  @media (max-width: 768px) {
      .table-header { display: none; }
      .table-row {
          grid-template-columns: 1fr;
          gap: 0.5rem;
      }
      .desktop-only { display: none; }
      .mobile-desc {
          display: block;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 0.5rem;
      }
      .col-status {
          margin-top: 0.5rem;
      }
  }
</style>
