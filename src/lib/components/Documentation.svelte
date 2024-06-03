<script lang="ts">
  import { renderBlockText } from "$lib/modules/sanity"
  import type { Documentation } from "$lib/types/sanity.types"
  export let post: Documentation

  import Slideshow from "$lib/components/subs/Slideshow.svelte"
  import TLine from "./subs/TLine.svelte"

  // Determine layout
  const text = post.content?.content ?? false
  const slides =
    post.slideshow && Array.isArray(post.slideshow) && post.slideshow.length > 0
</script>

<!-- DOCUMENTATION POP OVER -->
<div class="work-documentation-popover" class:text class:slides>
  <!-- TEXT -->
  <div class="work-documentation-popover-text">
    {@html renderBlockText(post.content?.content ?? [])}
  </div>

  <!-- TIMELINE -->
  <div class="timeline">
    <TLine startYear={post.startYear} endYear={post.endYear} />
  </div>

  <!-- SLIDESHOW -->
  <div class="work-documentation-popover-slideshow">
    <Slideshow {post} />
  </div>

  <!-- CLOSE -->
  <!-- svelte-ignore a11y-missing-content -->
  <a
    href="/#work"
    class="work-documentation-popover-close"
    data-sveltekit-noscroll
  />
</div>

<style lang="scss">
  @import "../styles/responsive.scss";

  .work-documentation-popover-text {
    position: fixed;
    top: 0;
    right: 0;
    width: calc(33.3333%);
    font-family: var(--font-family-normal);
    font-size: var(--font-size-small);
    height: 100%;
    overflow-x: hidden !important;
    padding-top: 20px;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 200px;

    @include screen-size("small") {
      position: static;
      width: 100%;
      height: auto;
      padding-bottom: 20px;
    }
  }

  :global(.work-documentation-popover-text img) {
    max-width: 90%;
    height: auto;
    filter: grayscale(1);
  }

  :global(.work-documentation-popover-text iframe) {
    max-width: 90%;
    height: auto;
    border: none !important;
    filter: grayscale(1);
  }

  :global(.work-documentation-popover-text p) {
    width: 90%;
  }

  :global(.work-documentation-popover-text a) {
    color: var(--green);
    font-style: italic;
    text-decoration: none;
  }

  :global(.work-documentation-popover-text a:hover) {
    color: var(--foreground);
  }

  .work-documentation-popover-slideshow {
    position: fixed;
    top: 0;
    left: 0;
    width: 66.6666%;
    height: 100%;

    @include screen-size("small") {
      position: static;
      width: 100%;
      height: auto;
    }
  }

  .timeline {
    position: fixed;
    bottom: 0;
    left: 20px;
    width: calc(66.6666% - 80px);

    @include screen-size("small") {
      position: static;
      bottom: unset;
      ldeft: unset;
      margin-left: 20px;
      width: calc(100% - 40px);

      // display: none;
    }
  }

  .work-documentation-popover-close {
    position: fixed;
    top: 10px;
    right: 30px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    z-index: 1000;

    &:after {
      content: "";
      height: 20px;
      border-left: 2px solid var(--green);
      position: absolute;
      transform: rotate(45deg);
      left: 15px;
      z-index: 1000;
    }

    &:before {
      content: "";
      height: 20px;
      border-left: 2px solid var(--green);
      position: absolute;
      transform: rotate(-45deg);
      left: 15px;
    }

    &:hover {
      &:after {
        border-left: 2px solid black;
      }
      &:before {
        border-left: 2px solid black;
      }
    }
  }
</style>
