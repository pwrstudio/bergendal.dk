<script lang="ts">
  import { renderBlockText } from "$lib/modules/sanity"
  import type {
    TextAndArchive,
    ContributionsToResearch,
  } from "$lib/types/sanity.types"
  export let page: TextAndArchive | ContributionsToResearch
</script>

<!-- LISTING -->
<div id="text-and-archive" class="column-section">
  <div class="listing-title">{page.title}</div>

  <!-- CONTENT -->
  <div class="listing-content">
    {#each page.list ?? [] as item}
      <div class="listing-item">
        <div class="listing-year">{item.year}</div>
        <div class="listing-text">
          {@html renderBlockText(item.content?.content ?? [])}
          {#if item.externalLink}
            <a href={item.externalLink} target="_blank">read more ></a>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .listing-title {
    font-family: var(--font-family-normal);
    font-size: var(--font-size-medium);
  }

  .listing-item {
    font-family: var(--font-family-extended);
    font-size: var(--font-size-medium);

    a {
      color: var(--green);
      font-style: italic;
      text-decoration: none;
      &:hover {
        color: var(--foreground);
      }
    }

    .listing-year {
      font-size: var(--font-size-small);
      margin-bottom: 1em;
      margin-top: 1.5em;
    }
  }

  :global(.listing-content p) {
    margin: 0;
    display: inline-block;
  }
</style>
