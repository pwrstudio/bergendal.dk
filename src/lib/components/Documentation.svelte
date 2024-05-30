<script lang="ts">
  import { renderBlockText, urlFor } from "$lib/modules/sanity"
  import type { Documentation } from "$lib/types/sanity.types"
  export let post: Documentation

  // Determine layout
  const text = post.content?.content ?? false
  const slides =
    post.slideshow && Array.isArray(post.slideshow) && post.slideshow.length > 0
</script>

<!-- DOCUMENTATION POP OVER -->
<div class="work-documentation-popover" class:text class:slides>
  <!-- SLIDESHOW -->
  <div class="work-documentation-popover-slideshow">
    {#each post.slideshow ?? [] as slide}
      <div class="work-documentation-popover-slideshow-slide">
        {#if slide._type == "image"}
          <img src={urlFor(slide).url()} alt={slide.caption} />
          {#if slide.caption}
            <div class="work-documentation-popover-slideshow-caption">
              {slide.caption}
            </div>
          {/if}
        {:else if slide._type == "video"}
          Video
        {/if}
      </div>
    {/each}
  </div>

  <!-- TEXT -->
  <div class="work-documentation-popover-text">
    {@html renderBlockText(post.content?.content ?? [])}
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

  .work-documentation-popover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 1000;
    &.active {
      display: flex;
      @include screen-size("small") {
        display: block;
      }
    }

    &.text {
      @include screen-size("small") {
        .work-documentation-popover-text {
          display: flex;
        }
        .work-documentation-popover-slideshow {
          display: none;
        }
        .work-documentation-popover-mobile-bar-dot-text {
          svg {
            fill: var(--green);
          }
        }
        .work-documentation-popover-mobile-bar-dot-slides {
          svg {
            fill: black;
          }
        }
      }
    }

    &.slides {
      @include screen-size("small") {
        .work-documentation-popover-slideshow {
          display: flex;
        }
        .work-documentation-popover-text {
          display: none;
        }
        .work-documentation-popover-mobile-bar-dot-text {
          svg {
            fill: black;
          }
        }
        .work-documentation-popover-mobile-bar-dot-slides {
          svg {
            fill: var(--green);
          }
        }
      }
    }
  }

  .work-documentation-popover-text {
    width: calc(30.3333%);
    font-family: var(--font-family-normal);
    font-size: var(--font-size-small);
    height: calc(100% - 60px);
    top: 40px;
    overflow-x: hidden !important;
    .simplebar-track.horizontal {
      display: none !important;
    }
    img {
      max-width: 90%;
      height: auto;
      filter: grayscale(1);
    }
    iframe {
      max-width: 90%;
      height: auto;
      border: none !important;
      filter: grayscale(1);
    }
    p {
      width: 90%;
    }
    a {
      color: var(--green);
      font-style: italic;
      text-decoration: none;
      &:hover {
        color: black;
      }
    }
    &.hidden {
      opacity: 0;
    }
    @include screen-size("small") {
      left: 20px;
      width: calc(100% - 40px);
      height: calc(100% - 120px);
    }
  }

  .work-documentation-popover-slideshow {
    width: 66.6666%;
    height: calc(100% - 20px);
    overflow-x: scroll;
    white-space: nowrap;
    margin-right: 20px;
    @include screen-size("small") {
      margin-left: 20px;
      width: calc(100% - 40px);
      height: calc(100% - 90px);
    }
    &.hidden {
      opacity: 0;
    }
  }

  .work-documentation-popover-mobile-bar {
    box-shadow: 0px 0px 10px var(--grey);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 30px;
    padding-left: 30px;
    font-family: var(--font-family-normal);
    font-size: var(--font-size-medium);
    display: none;
    @include screen-size("small") {
      display: block;
    }
  }

  .work-documentation-popover-slideshow-slide {
    width: 66.666vw;
    display: inline-block;
    vertical-align: top;
    height: calc(90vh - 50px);
    img {
      max-height: 80%;
      max-width: 60vw;
    }
    @include screen-size("small") {
      width: 100vw;
      img {
        max-height: 85vh;
        max-width: 85vw;
      }
    }
  }

  .work-documentation-popover-slideshow-caption {
    font-family: var(--font-family-normal);
    font-size: var(--font-size-small);
    font-style: normal;
    font-weight: normal;
    margin-left: 40px;
    margin-top: 20px;
    max-width: 40ch;
    white-space: normal;
    @include screen-size("small") {
      margin-left: 20px;
    }
  }

  .work-documentation-popover-mobile-bar-nav {
    position: absolute;
    left: 50%;
    margin-left: -50px;
  }

  .work-documentation-popover-mobile-bar-dot {
    float: left;
    padding-right: 10px;
    svg {
      position: relative;
      top: 6px;
      height: 20px;
    }
    &:hover {
      fill: var(--green);
      cursor: pointer;
    }
  }

  .work-documentation-popover-close {
    position: fixed;
    top: 10px;
    right: 16px;
    width: 20px;
    height: 20px;
    cursor: pointer;

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
