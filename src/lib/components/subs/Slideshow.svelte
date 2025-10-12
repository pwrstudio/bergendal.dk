<script lang="ts">
  import type { Documentation } from "$lib/types/sanity.types"
  import { onMount } from "svelte"

  import Swiper from "swiper"
  import { Scrollbar } from "swiper/modules"
  import "swiper/css"
  import "swiper/css/scrollbar"

  import TLine from "$lib/components/subs/TLine.svelte"
  import Slide from "$lib/components/subs/Slide.svelte"

  export let post: Documentation

  let swiper: Swiper
  let activeIndex = 0

  $: numberOfSlides = post?.slideshow?.length ?? 0

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
      {#each post.slideshow ?? [] as slide, index}
        <Slide {slide} {index} {numberOfSlides} />
      {/each}
    </div>

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
      height: calc(100vh - 100px);

      @include screen-size("small") {
        height: calc(60vh - 100px);
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
