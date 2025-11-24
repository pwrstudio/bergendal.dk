<script lang="ts">
  import type { Documentation } from "@sanity-types"
  import TLine from "$lib/components/subs/TLine.svelte"
  import Slide from "$lib/components/subs/Slide.svelte"
  import ArrowLeft from "$lib/components/subs/ArrowLeft.svelte"
  import ArrowRight from "$lib/components/subs/ArrowRight.svelte"

  let { post }: { post: Documentation } = $props()

  let numberOfSlides = $derived(post?.slideshow?.length ?? 0)
  let showTimeline = $derived(!!post.startYear)

  let slideshowTrack: HTMLDivElement
  let currentSlide = $state(0)

  function scrollToSlide(index: number) {
    const slides = slideshowTrack.querySelectorAll(".slide")
    if (slides[index]) {
      slides[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
      currentSlide = index
    }
  }

  function nextSlide() {
    if (currentSlide < numberOfSlides - 1) {
      scrollToSlide(currentSlide + 1)
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      scrollToSlide(currentSlide - 1)
    }
  }
</script>

<div class="slideshow">
  <div class="slideshow-container">
    <!-- Slides -->
    <div class="slideshow-track" class:no-timeline={!showTimeline} bind:this={slideshowTrack}>
      {#each post.slideshow ?? [] as slide, index}
        <Slide {slide} {index} {numberOfSlides} />
      {/each}
    </div>

    <!-- Navigation Arrows -->
    {#if currentSlide > 0}
      <button class="arrow arrow-left" onclick={prevSlide} aria-label="Previous slide">
        <ArrowLeft />
      </button>
    {/if}
    {#if currentSlide < numberOfSlides - 1}
      <button class="arrow arrow-right" onclick={nextSlide} aria-label="Next slide">
        <ArrowRight />
      </button>
    {/if}

    <!-- TIMELINE -->
    {#if showTimeline}
      <div class="timeline">
        <TLine startYear={post.startYear!} endYear={post.endYear} />
      </div>
    {/if}
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
    overflow-x: scroll; /* Changed from auto to scroll to force scrollbar */
    overflow-y: hidden;
    height: calc(100vh - 80px);
    padding: 20px;
    padding-bottom: 30px; /* Extra padding for scrollbar */
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;

    @include screen-size("small") {
      height: calc(70vh - 80px);
    }

    /* Always visible scrollbar for Firefox */
    scrollbar-width: thin;
    scrollbar-color: var(--green) rgba(0, 204, 102, 0.15);

    /* Force scrollbar to always be visible on WebKit browsers */
    &::-webkit-scrollbar {
      -webkit-appearance: none;
      height: 12px;
      display: block;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 204, 102, 0.15);
      border-radius: 6px;
      display: block;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--green);
      border-radius: 6px;
      min-width: 50px;
      display: block;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: var(--foreground);
    }

    &::-webkit-scrollbar-thumb:active {
      background: var(--foreground);
    }

    &.no-timeline {
      padding-bottom: 0;
      height: calc(100vh - 10px);

      @include screen-size("small") {
        height: calc(70vh - 10px);
      }
    }
  }

  .timeline {
    position: absolute;
    bottom: 0;
    left: 20px;
    z-index: 5;
    width: calc(100% - 40px);
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.9);
    border: none;
    cursor: pointer;
    color: var(--green);
    padding: 5px;
    z-index: 10;
    transition: color 0.2s;

    &:hover {
      color: var(--foreground);
    }

    &.arrow-left {
      left: 20px;

      @include screen-size("small") {
        display: none;
      }
    }

    &.arrow-right {
      right: 20px;

      @include screen-size("small") {
        display: none;
      }
    }

    @include screen-size("small") {
      display: none;
    }
  }
</style>
