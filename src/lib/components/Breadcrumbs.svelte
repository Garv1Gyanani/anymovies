<script lang="ts">
  import { ChevronRight, Home } from 'lucide-svelte';

  export let crumbs: { label: string; href: string }[] = [];
</script>

<nav aria-label="Breadcrumb">
  <ol class="breadcrumbs">
    <li class="crumb">
      <a href="/">
        <Home size={16} />
        <span class="sr-only">Home</span>
      </a>
      <ChevronRight size={14} class="separator" />
    </li>
    
    {#each crumbs as crumb, i}
      <li class="crumb" class:active={i === crumbs.length - 1}>
        {#if i < crumbs.length - 1}
          <a href={crumb.href}>{crumb.label}</a>
          <ChevronRight size={14} class="separator" />
        {:else}
          <span aria-current="page">{crumb.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<script context="module" lang="ts">
  // For Schema.org BreadcrumbList structured data
  export function getBreadcrumbSchema(crumbs: { label: string; href: string }[], siteUrl: string) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteUrl
        },
        ...crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 2,
          "name": crumb.label,
          "item": `${siteUrl}${crumb.href}`
        }))
      ]
    };
  }
</script>

<style>
  .breadcrumbs {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  .crumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .crumb a {
    color: var(--text-secondary);
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: color 0.2s;
  }

  .crumb a:hover {
    color: var(--primary-color);
  }

  .crumb.active span {
    color: var(--text-primary);
    font-weight: 500;
  }

  /* Global style for lucide icons usually doesn't need much, 
     but ensures separator color matches text */
  :global(.separator) {
    color: var(--text-muted);
    opacity: 0.6;
  }

  /* Ensure Home icon aligns nicely */
  :global(.breadcrumbs .lucide-home) {
    margin-bottom: 2px;
  }
</style>
