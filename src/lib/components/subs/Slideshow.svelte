<script lang="ts">
  import Swiper from "swiper"
  import { Scrollbar } from "swiper/modules"
  import "swiper/css"
  import "swiper/css/scrollbar"
  import { urlFor } from "$lib/modules/sanity"
  import type { Documentation } from "$lib/types/sanity.types"
  import { onMount } from "svelte"
  import has from "lodash/has.js"
  export let post: Documentation

  import VideoPlayer from "$lib/components/subs/VideoPlayer.svelte"
  import TLine from "$lib/components/subs/TLine.svelte"

  let swiper: Swiper
  let activeIndex = 0

  $: isMultiSlide = has(swiper, "slides") && swiper.slides.length > 1
  $: isBeginning = activeIndex === 0
  $: isEnd = has(swiper, "slides") && activeIndex === swiper.slides.length - 1
  $: caption = post.slideshow ? post.slideshow[activeIndex].caption ?? "" : ""
  $: year = post.slideshow
    ? post.slideshow[activeIndex].year ?? undefined
    : undefined
  $: numberOfSlides = post?.slideshow?.length ?? 0

  const nextSlide = () => {
    swiper.slideNext()
  }

  const prevSlide = () => {
    swiper.slidePrev()
  }

  onMount(() => {
    swiper = new Swiper(".swiper", {
      modules: [Scrollbar],
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
      },
    })
    swiper.on("slideChange", () => {
      activeIndex = swiper.activeIndex
    })
  })
</script>

<div class="slideshow">
  <!-- Slider main container -->
  <div class="swiper">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      {#each post.slideshow ?? [] as slide}
        <div class="swiper-slide">
          {#if slide._type == "image"}
            <img src={urlFor(slide).url()} alt={slide.caption} />
          {:else if slide._type == "video"}
            <VideoPlayer {slide} />
          {/if}
        </div>
      {/each}
    </div>

    <!-- CAPTION -->
    {#if post.slideshow}
      <div class="caption">
        {`[${activeIndex + 1}/${numberOfSlides}] ${caption}`}
        {#if year}
          ({year})
        {/if}
      </div>
    {/if}

    <!-- SCROLLBAR -->
    <div class="swiper-scrollbar"></div>

    <!-- TIMELINE -->
    <div class="timeline">
      <TLine startYear={post.startYear} endYear={post.endYear} />
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .swiper {
    margin-top: 0;
    height: 100vh;
    position: relative;

    @include screen-size("small") {
      height: 60vh;
    }

    .swiper-wrapper {
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

        @include screen-size("small") {
          // align-items: center;
          // justify-content: center;
        }

        img {
          max-height: 80%;
          max-width: 80%;
          object-fit: contain;

          @include screen-size("small") {
            max-height: 100%;
            max-width: 100vw;
            object-fit: contain;
          }
        }

        .video {
          width: 100%;
          max-width: 100%;
          height: auto;
          aspect-ratio: 16 / 9;

          iframe {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .swiper-scrollbar {
      position: absolute;
      bottom: 57px;
      left: 55px;
      width: calc(100% - 130px);
      height: 10px;
      z-index: 10;
      background: transparent;
    }

    .caption {
      position: absolute;
      bottom: 120px;
      left: 20px;
      font-family: var(--font-family-normal);
      font-size: var(--font-size-small);

      @include screen-size("small") {
        bottom: 20px;

        margin-left: 0;
        margin-right: 0;
        text-align: center;
        padding-bottom: 60px;
      }
    }

    .timeline {
      position: absolute;
      bottom: 20px;
      left: 20px;
      z-index: 5;
      width: calc(100% - 40px);
    }
  }

  :global(.swiper-scrollbar-drag) {
    background: var(--green) !important;
    border-radius: 10px;
    cursor: grab !important;
  }
</style>
