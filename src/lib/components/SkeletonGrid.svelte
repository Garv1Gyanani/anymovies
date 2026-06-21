<div class="skeleton-grid">
  {#each Array(20) as _}
    <div class="skeleton-card">
      <div class="skeleton-image"></div>
      <div class="skeleton-text skeleton-title"></div>
      <div class="skeleton-text skeleton-subtitle"></div>
    </div>
  {/each}
</div>

<style>
  .skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
    padding: 2rem 0;
  }

  .skeleton-card {
    animation: pulse 1.5s ease-in-out infinite;
  }

  .skeleton-image {
    width: 100%;
    aspect-ratio: 2/3;
    background: linear-gradient(
      90deg,
      var(--surface-color) 0%,
      var(--surface-hover) 50%,
      var(--surface-color) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 12px;
    margin-bottom: 0.75rem;
  }

  .skeleton-text {
    height: 16px;
    background: linear-gradient(
      90deg,
      var(--surface-color) 0%,
      var(--surface-hover) 50%,
      var(--surface-color) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }

  .skeleton-title {
    width: 80%;
  }

  .skeleton-subtitle {
    width: 60%;
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  @media (max-width: 640px) {
    .skeleton-grid {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 1rem;
    }
  }
</style>
