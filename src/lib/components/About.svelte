<script lang="ts">
  import { renderBlockText, urlFor } from "$lib/modules/sanity"
  import type { About } from "$lib/types/sanity.types"
  export let about: About

  import TimeLine from "$lib/components/subs/TLine.svelte"
</script>

<div id="about" class="column-section">
  <!-- IMAGE -->
  <img
    src={urlFor(about.featuredImage).url()}
    alt="Kerstin Bergendal"
    class="work-intro-image"
  />

  <!-- TIMELINE -->
  <TimeLine startYear={about.startYear} endYear={about.endYear} />

  <!-- CONTENT -->
  <div class="about-content">
    {@html renderBlockText(about.content?.content ?? [])}
  </div>
</div>

<style lang="scss">
  @import "../styles/responsive.scss";

  .about-content {
    font-family: var(--font-family-extended);
    font-size: var(--font-size-large);

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
