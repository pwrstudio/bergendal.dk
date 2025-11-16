<script lang="ts">
  import type { Documentation } from "@sanity-types"
  import TLine from "$lib/components/subs/TLine.svelte"
  import Slide from "$lib/components/subs/Slide.svelte"

  export let post: Documentation

  $: numberOfSlides = post?.slideshow?.length ?? 0
</script>

<div class="slideshow">
  <div class="slideshow-container">
    <!-- Slides -->
    <div class="slideshow-track">
      {#each post.slideshow ?? [] as slide, index}
        <Slide {slide} {index} {numberOfSlides} />
      {/each}
    </div>

    <!-- TIMELINE -->
    <div class="timeline">
      <TLine startYear={post.startYear} endYear={post.endYear} />
    </div>
  </div>
</div>

<style lang="scss">
  @use "../../styles/responsive.scss" as *;

  .slideshow {
    width: 100%;
    height: 100vh;
    position: relative;

    @include screen-size("small") {
      height: 70vh;
    }
  }

  .slideshow-container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .slideshow-track {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    overflow-y: hidden;
    height: calc(100vh - 60px);
    padding: 20px;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;

    @include screen-size("small") {
      height: calc(70vh - 60px);
    }

    /* Hide scrollbar but keep functionality */
    scrollbar-width: thin;
    scrollbar-color: var(--green) transparent;

    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--green);
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: var(--foreground);
    }
  }

  .timeline {
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 5;
    width: calc(100% - 40px);
  }
</style>
