<script lang="ts">
  import { Share2, Twitter, Facebook, MessageCircle, Copy, Check } from 'lucide-svelte';

  let { title, url } = $props<{ title: string; url: string }>();
  
  let showMenu = $state(false);
  let copied = $state(false);

  const shareUrl = `https://anymovies.run.place${url}`;
  const text = `Check out ${title} on ANYMOVIES!`;

  function copyLink() {
    navigator.clipboard.writeText(shareUrl);
    copied = true;
    setTimeout(() => copied = false, 2000);
  }

  function shareTwitter() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  }

  function shareFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  }

  function shareWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`, '_blank');
  }

  function nativeShare() {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: shareUrl
      });
    }
  }
</script>

<div class="share-container">
  <button class="share-btn" onclick={() => showMenu = !showMenu}>
    <Share2 size={20} />
    Share
  </button>

  {#if showMenu}
    <div class="share-menu">
      <button onclick={shareTwitter} class="share-option twitter">
        <Twitter size={18} />
        Twitter
      </button>
      <button onclick={shareFacebook} class="share-option facebook">
        <Facebook size={18} />
        Facebook
      </button>
      <button onclick={shareWhatsApp} class="share-option whatsapp">
        <MessageCircle size={18} />
        WhatsApp
      </button>
      <button onclick={copyLink} class="share-option copy">
        {#if copied}
          <Check size={18} />
          Copied!
        {:else}
          <Copy size={18} />
          Copy Link
        {/if}
      </button>
    </div>
  {/if}
</div>

<style>
  .share-container {
    position: relative;
  }

  .share-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    color: var(--text-primary);
    font-weight: 600;
    transition: all 0.2s;
    cursor: pointer;
  }

  .share-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--primary-color);
  }

  .share-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    background: var(--surface-color);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 180px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    z-index: 100;
  }

  .share-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: transparent;
    border: none;
    border-radius: 8px;
    color: var(--text-primary);
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
  }

  .share-option:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .share-option.twitter:hover {
    background: rgba(29, 155, 240, 0.1);
    color: #1DA1F2;
  }

  .share-option.facebook:hover {
    background: rgba(24, 119, 242, 0.1);
    color: #1877F2;
  }

  .share-option.whatsapp:hover {
    background: rgba(37, 211, 102, 0.1);
    color: #25D366;
  }

  .share-option.copy:hover {
    background: rgba(0, 242, 234, 0.1);
    color: var(--primary-color);
  }
</style>
