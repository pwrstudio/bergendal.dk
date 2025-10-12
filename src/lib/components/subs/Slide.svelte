<script lang="ts">
  import { urlFor } from "$lib/modules/sanity"

  import VideoPlayer from "$lib/components/subs/VideoPlayer.svelte"

  export let slide: any
  export let index: number
  export let numberOfSlides: number
</script>

<div class="swiper-slide">
  {#if slide._type == "image"}
    <img src={urlFor(slide).url()} alt={slide.caption} />
  {:else if slide._type == "video"}
    <VideoPlayer {slide} />
  {/if}
  <div class="caption">
    {`[${index + 1}/${numberOfSlides}] ${slide.caption ?? ""}`}
    {#if slide.year}
      ({slide.year})
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .swiper-slide {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column; // Align items from top to bottom
    align-items: flex-start; // Align items to the left
    justify-content: flex-start; // Align items to the top
    user-select: none;
    cursor: grab;
    padding-top: 36px;

    @include screen-size("small") {
      padding-top: 0;
    }

    img {
      max-height: 90%;
      max-width: calc(100% - 20px);
      object-fit: contain;

      @include screen-size("small") {
        max-height: 90%;
        max-width: 95vw;
        object-fit: contain;
      }
    }

    .caption {
      margin-top: 1em;
      font-family: var(--font-family-normal);
      font-size: var(--font-size-small);
      margin-left: 20px;
    }
  }
</style>
