<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    type: 'banner' | 'sidebar' | 'native';
    slotId?: string; // Specific ID provided by your ad network
    className?: string;
  }

  let { type, slotId, className = '' }: Props = $props();

  onMount(() => {
    // This is where you would typically trigger the ad network's push function
    // Example for Google AdSense:
    // (window.adsbygoogle = window.adsbygoogle || []).push({});
    
    // For many networks, you just need the HTML to be present, 
    // but some require a manual trigger after the component mounts.
    console.log(`Ad slot ${slotId} of type ${type} initialized`);
  });
</script>

<div class="ad-wrapper {type} {className}">
  <div class="ad-label">Advertisement</div>
  
  <!-- Placeholder for the actual ad code -->
  <div class="ad-content">
    {#if slotId}
      <!-- 
        Example placeholder for most ad networks:
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slotId}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      -->
      <div class="placeholder-box">
        <p>Ad Slot: {slotId}</p>
        <p>Type: {type}</p>
      </div>
    {:else}
      <div class="placeholder-box">
        <p>Sample Ad Unit</p>
        <p>Replace this with your Ad Network ID</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .ad-wrapper {
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    max-width: var(--container-width, 1200px);
  }

  .ad-label {
    font-size: 0.7rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.5;
  }

  .ad-content {
    width: 100%;
    background: rgba(255, 255, 255, 0.02);
    border: 1px dashed rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    min-height: 90px; /* Minimum height for standard banners */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .placeholder-box {
    text-align: center;
    padding: 1rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  /* Specific sizes based on type */
  .banner .ad-content {
    max-width: 728px;
    height: 90px;
  }

  .sidebar .ad-content {
    max-width: 300px;
    height: 250px;
  }

  .native .ad-content {
    min-height: 150px;
  }

  @media (max-width: 768px) {
    .banner .ad-content {
      max-width: 320px;
      height: 100px;
    }
  }
</style>
