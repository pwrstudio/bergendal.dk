<script lang="ts">
  import Swiper from "swiper"
  import "swiper/css"
  import { urlFor } from "$lib/modules/sanity"
  import type { Documentation } from "$lib/types/sanity.types"
  import { onMount } from "svelte"
  import has from "lodash/has.js"
  export let post: Documentation

  import VideoPlayer from "./VideoPlayer.svelte"

  let swiper: Swiper
  let activeIndex = 0

  $: isMultiSlide = has(swiper, "slides") && swiper.slides.length > 1
  $: isBeginning = activeIndex === 0
  $: isEnd = has(swiper, "slides") && activeIndex === swiper.slides.length - 1
  $: caption = post.slideshow[activeIndex].caption ?? ""
  $: numberOfSlides = post?.slideshow?.length ?? 0

  const nextSlide = () => {
    swiper.slideNext()
  }

  const prevSlide = () => {
    swiper.slidePrev()
  }

  onMount(() => {
    swiper = new Swiper(".swiper")
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
            <VideoPlayer url={slide.url} />
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

<div class="caption">{`(${activeIndex + 1}/${numberOfSlides}) ${caption}`}</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .swiper {
    margin-top: 0;
    height: 80vh;

    @include screen-size("small") {
      height: 60vh;
    }

    .swiper-wrapper {
      .swiper-slide {
        height: 100%;
        width: 100%;
        position: relative;
        display: flex;
        user-select: none;
        cursor: grab;

        img {
          max-height: 80%;
          max-width: 60vw;

          @include screen-size("small") {
            object-fit: cover;
            max-height: 100%;
            max-width: 100vw;
          }
        }
      }
    }
  }

  .caption {
    font-family: var(--font-family-normal);
    font-size: var(--font-size-small);
    margin-left: 20px;
    margin-top: 20px;
  }
</style>
