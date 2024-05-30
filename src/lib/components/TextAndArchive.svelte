<script lang="ts">
  import { renderBlockText } from "$lib/modules/sanity"
  import type { TextAndArchive } from "$lib/types/sanity.types"
  export let textAndArchive: TextAndArchive
</script>

<!-- TEXTS & ARCHIVE -->
<div id="text-and-archive" class="column-section">
  <div class="text-archive-title">BIBLIOGRAPHY AND MEDIA</div>

  <!-- CONTENT -->
  <div class="text-archive-content">
    {#each textAndArchive.list ?? [] as item}
      <div class="text-archive-item">
        {item.year}
        {@html renderBlockText(item.content?.content ?? [])}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .text-archive-title,
  .research-title {
    font-family: var(--font-family-normal);
    font-size: var(--font-size-small);
  }

  .text-archive-content,
  .research-content,
  .cv-contact-content {
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
  }
</style>
