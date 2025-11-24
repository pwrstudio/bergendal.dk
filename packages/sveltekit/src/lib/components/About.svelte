<script lang="ts">
  import { renderBlockText, urlFor } from "$lib/modules/sanity"
  import type { About } from "@sanity-types"

  let { about }: { about: About } = $props()

  import TimeLine from "$lib/components/subs/TLine.svelte"
</script>

<div id="about" class="column-section">
  <!-- CONTENT -->
  <div class="about-content">
    {@html renderBlockText(about.content?.content ?? [])}
  </div>

  <!-- IMAGE -->
  {#if about.featuredImage}
    <img src={urlFor(about.featuredImage).url()} alt="Kerstin Bergendal" class="work-intro-image" />
  {/if}

  <!-- TIMELINE -->
  {#if about.startYear}
    <TimeLine startYear={about.startYear} endYear={about.endYear} />
  {/if}
</div>

<style lang="scss">
  @use "../styles/responsive.scss" as *;

  .about-content {
    font-family: var(--font-family-extended);
    font-size: var(--font-size-medium);

    @media (max-width: 900px) {
      font-size: var(--font-size-medium);
    }
  }

  :global(.about-content a) {
    color: var(--green);
    font-style: italic;
    text-decoration: none;
  }

  :global(.about-content a:hover) {
    color: var(--foreground);
  }
</style>
