<script lang="ts">
  import { renderBlockText } from "$lib/modules/sanity"
  import type { Work } from "$lib/types/sanity.types"
  export let work: Work

  function formatNumber(num: number): string {
    let numStr = num.toString()
    return numStr.length < 3 ? numStr.padStart(3, "0") : numStr
  }
</script>

<div id={work.slug?.current ?? ""} class="work-item">
  <!-- META -->
  <div class="work-meta">
    <!-- DATES -->
    {#if !work.endYear}
      <div class="work-meta-year">{work.startYear}</div>
    {:else}
      <div class="work-meta-year">{work.startYear}–{work.endYear}</div>
    {/if}
    <!-- PARTICIPANTS -->
    {#if work.participants}
      <div class="work-meta-participants">
        Participants: {work.participants}
      </div>
    {/if}
  </div>
  <!-- SUMMARY -->
  {#if work.content?.content}
    <div class="work-summary">
      {@html renderBlockText(work.content.content)}
    </div>
  {/if}
  <!-- DOCUMENTATION -->
  {#if work.documentation}
    <div class="work-documentation">
      {#each work.documentation as documentation, index}
        <a href={documentation.slug?.current} class="work-documentation-item">
          <span class="work-documentation-item-number">
            #{formatNumber(index + 1)}
          </span>
          <span class="work-documentation-item-title">
            {documentation.title}
          </span>
        </a>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .work-item {
    margin-bottom: 60px;

    @media (max-width: 900px) {
      margin-bottom: 40px;
    }
  }

  .work-meta {
    font-family: var(--font-family-normal);
    font-size: 13px;
  }

  .work-summary {
    font-family: var(--font-family-extended);
    font-size: var(--font-size-large);

    @media (max-width: 900px) {
      font-size: var(--font-size-medium);
    }
  }

  .work-documentation {
    padding-left: 50px;
  }

  .work-documentation-item {
    color: var(--foreground);
    text-decoration: none;
    font-family: var(--font-family-extended);
    font-size: var(--font-size-medium);
    cursor: pointer;
    display: block;

    &:hover {
      color: var(--green);
    }
  }

  .work-documentation-item-number {
    color: var(--green);
    width: 4ch;
  }
</style>
