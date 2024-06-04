<script lang="ts">
  import type { Video } from "$lib/types/sanity.types"
  import { urlFor } from "$lib/modules/sanity"
  import getVideoId from "get-video-id"

  export let slide: Video

  let hasPosterImage = !!slide.posterImage
  let imageURL = hasPosterImage
    ? urlFor(slide.posterImage).height(800).auto("format").url()
    : ""
  let active = hasPosterImage ? false : true
  let postfix = hasPosterImage ? "?autoplay=1" : ""

  function generateEmbedCode(url: string): string {
    const { id, service } = getVideoId(url)

    if (!id || !service) {
      return "Invalid URL or unsupported video service"
    }

    switch (service) {
      case "youtube":
        return `<iframe width="100%"" height="100%" src="https://www.youtube.com/embed/${id}${postfix}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      case "vimeo":
        return `<iframe src="https://player.vimeo.com/video/${id}${postfix}" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
      default:
        return "Unsupported video service"
    }
  }

  let videoEmbedCode = slide.url ? generateEmbedCode(slide.url) : ""
</script>

<div class="video" class:active>
  {#if active}
    {@html videoEmbedCode}
  {:else}
    <button class="play-button" on:click={() => (active = true)}>▶</button>
    <img src={imageURL} alt="video thumbnail" />
  {/if}
</div>

<style lang="scss">
  .video {
    background: var(--green);
    width: 720px;
    max-width: 90%;
    aspect-ratio: 16/9;
    line-height: 0;
    position: relative;

    .play-button {
      background: transparent;
      border: 0;
      position: absolute;
      top: 50%;
      left: 52%;
      transform: translate(-50%, -50%);
      z-index: 100;
      font-size: 128px;
      color: var(--green);
      cursor: pointer;

      &:hover {
        color: var(--background);
      }
    }

    &.active {
      cursor: default;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>
