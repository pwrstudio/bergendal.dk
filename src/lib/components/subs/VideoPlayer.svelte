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
  {@html videoEmbedCode}
</div>

<style lang="scss">
  .video {
    width: calc(100% - 20px);
    max-height: 95%;
    aspect-ratio: 16/9;
    line-height: 0;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>
