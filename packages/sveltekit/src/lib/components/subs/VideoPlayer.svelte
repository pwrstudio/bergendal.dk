<script lang="ts">
  import getVideoId from "get-video-id"

  export let slide: {
    url?: string
    year?: number
    _type: "video"
    _key: string
  }
  let postfix = ""

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

<div class="video">
  <div class="video-wrapper">
    {@html videoEmbedCode}
  </div>
</div>

<style lang="scss">
  @use "../../styles/responsive.scss" as *;

  .video {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .video-wrapper {
    position: relative;
    /* Size to fit in 2/3 width container with some margin */
    width: min(55vw, calc((100vh - 200px) * 16 / 9));
    aspect-ratio: 16/9;

    @include screen-size("small") {
      width: min(85vw, calc((70vh - 200px) * 16 / 9));
    }

    :global(iframe) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
</style>
