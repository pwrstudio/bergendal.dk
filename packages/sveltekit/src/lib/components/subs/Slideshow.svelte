<script lang="ts">
  import type { Documentation } from "@sanity-types"
  import TLine from "$lib/components/subs/TLine.svelte"
  import Slide from "$lib/components/subs/Slide.svelte"

  let { post }: { post: Documentation } = $props()

  let numberOfSlides = $derived(post?.slideshow?.length ?? 0)
  let showTimeline = $derived(!!post.startYear)
</script>

<div class="slideshow">
  <div class="slideshow-container">
    <!-- Slides -->
    <div class="slideshow-track" class:no-timeline={!showTimeline}>
      {#each post.slideshow ?? [] as slide, index}
        <Slide {slide} {index} {numberOfSlides} />
      {/each}
    </div>

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
</style>
