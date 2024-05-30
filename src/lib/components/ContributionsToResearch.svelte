<script lang="ts">
  import { renderBlockText } from "$lib/modules/sanity"
  import type { ContributionsToResearch } from "$lib/types/sanity.types"
  export let contributionsToResearch: ContributionsToResearch
</script>

<!-- CONTRIBUTIONS TO RESEARCH -->
<div id="contributions-to-research" class="column-section">
  <div class="research-title">
    CONTRIBUTIONS TO ACADEMIC RESEARCH (Selection)
  </div>

  <!-- CONTENT -->
  <div class="research-content">
    {#each contributionsToResearch.list ?? [] as item}
      <div class="research-item">
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
