<script lang="ts">
  import { urlFor } from "$lib/modules/sanity"

  import VideoPlayer from "$lib/components/subs/VideoPlayer.svelte"

  export let slide: any
  export let index: number
  export let numberOfSlides: number
</script>

<div class="slide">
  <div class="slide-content">
    {#if slide._type == "image"}
      <img src={urlFor(slide).url()} alt={slide.caption} />
    {:else if slide._type == "video"}
      <VideoPlayer {slide} />
    {/if}
  </div>
  <div class="caption">
    {`[${index + 1}/${numberOfSlides}] ${slide.caption ?? ""}`}
    {#if slide.year}
      ({slide.year})
    {/if}
  </div>
</div>

<style lang="scss">
  @use "../../styles/responsive.scss" as *;

  .slide {
    flex-shrink: 0;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1em;
    max-height: 100%;
  }

  .slide-content {
    display: inline-block;
    max-height: calc(100% - 3em);
    line-height: 0;

    img {
      max-height: calc(100vh - 200px);
      max-width: 55vw;
      height: auto;
      width: auto;
      object-fit: contain;
      display: block;

      @include screen-size("small") {
        max-height: calc(70vh - 200px);
        max-width: 85vw;
      }
    }
  }

  .caption {
    font-family: var(--font-family-normal);
    font-size: var(--font-size-small);
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    line-height: 1.2;
    /* Prevent caption from expanding the slide width */
    width: 0;
    min-width: 100%;
  }
</style>
