<script lang="ts">
  import { Play, X, Settings2, Languages } from 'lucide-svelte';
  import { fade, scale } from 'svelte/transition';
  import { getEmbedUrl, type Provider } from '$lib/vidsrc';


  interface Props {
    type: 'movie' | 'tv';
    id: string | number;
    season?: number;
    episode?: number;
    show?: boolean;
    onClose?: () => void;
  }

  let { type, id, season = 1, episode = 1, show = false, onClose }: Props = $props();

  let selectedProvider = $state<Provider>('vidsrc.ru');
  let isDub = $state(false);

  let embedUrl = $derived(getEmbedUrl(type, id, season, episode, selectedProvider, isDub));

  function handleClose() {
    if (onClose) onClose();
  }
</script>

{#if show}
  <div 
    class="player-overlay" 
    transition:fade={{ duration: 300 }}
    role="dialog"
    aria-modal="true"
  >
    <div class="player-container" transition:scale={{ duration: 300, start: 0.95 }}>
      <div class="player-header">
        <div class="title-info">
          <Play size={18} fill="currentColor" />
          <span>Now Playing</span>
        </div>

        <div class="player-controls">
          <!-- Audio Toggle -->
          <div class="toggle-group">
            <button 
              class="toggle-btn" 
              class:active={!isDub} 
              onclick={() => isDub = false}
              title="Subtitled"
            >
              <Languages size={14} /> Sub
            </button>
            <button 
              class="toggle-btn" 
              class:active={isDub} 
              onclick={() => isDub = true}
              title="Dubbed"
            >
              <Languages size={14} /> Dub
            </button>
          </div>

          <!-- Source Selector -->
          <div class="source-selector">
            <Settings2 size={16} />
            <select bind:value={selectedProvider}>
              <option value="vidsrc.ru">Server 1 (Fast)</option>
              <option value="vidsrc.me">Server 2 (Multi)</option>
              <option value="vidsrc.pro">Server 3 (HD)</option>
              <option value="superembed">Server 4 (VIP)</option>
            </select>

          </div>

          <button class="close-btn" onclick={handleClose} aria-label="Close player">
            <X size={24} />
          </button>
        </div>
      </div>
      
      <div class="iframe-wrapper">
        <iframe
          src={embedUrl}
          title="Video Player"
          frameborder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
{/if}

<style>
  .player-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    z-index: 2000; /* Higher z-index */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .player-container {
    width: 100%;
    max-width: 1200px;
    background: #0a0a0a;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 50px rgba(0, 229, 255, 0.1);
  }

  .player-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    flex-wrap: wrap;
    gap: 1rem;
  }

  .player-controls {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .toggle-group {
    display: flex;
    background: rgba(255, 255, 255, 0.05);
    padding: 3px;
    border-radius: 8px;
    border: 1px solid var(--glass-border);
  }

  .toggle-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-secondary);
    transition: all 0.2s;
  }

  .toggle-btn.active {
    background: var(--primary-color);
    color: black;
  }

  .source-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.05);
    padding: 4px 10px;
    border-radius: 8px;
    border: 1px solid var(--glass-border);
  }

  .source-selector select {
    background: none;
    border: none;
    color: white;
    font-size: 0.85rem;
    outline: none;
    cursor: pointer;
  }

  .source-selector select option {
    background: #1a1a1a;
    color: white;
  }

  .title-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--primary-color);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.9rem;
  }

  .close-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: rotate(90deg);
  }

  .iframe-wrapper {
    position: relative;
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
    background: black;
  }

  .iframe-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 850px) {
    .player-header {
      padding: 1rem;
    }
    .player-controls {
      width: 100%;
      justify-content: space-between;
      order: 3;
    }
  }

  @media (max-width: 640px) {
    .player-overlay {
      padding: 0.5rem;
    }
    .player-container {
      border-radius: 12px;
    }
    .toggle-btn span {
      display: none;
    }
  }
</style>

