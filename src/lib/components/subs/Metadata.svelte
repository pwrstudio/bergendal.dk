<script lang="ts">
  import type { Documentation, Image } from "$lib/types/sanity.types"
  import truncate from "lodash/truncate.js"
  import has from "lodash/has.js"
  import { toPlainText, urlFor } from "$lib/modules/sanity"
  export let post: Documentation | undefined = undefined

  const BASE_TITLE = "Kerstin Bergendal"
  const DEFAULT_DESCRIPTION = "Kerstin Bergendal"
  const BASE_URL = "https://bergendal.dk"
  const DEFAULT_IMAGE = "https://bergendal.dk/images/default.jpg"

  const getTitle = (p: Documentation) =>
    (p.title ? p.title + " | " : "") + BASE_TITLE

  const getDescription = (p: Documentation) => {
    if (!p.content) return DEFAULT_DESCRIPTION
    const d = p.content.content
      ? toPlainText(p.content.content)
      : DEFAULT_DESCRIPTION
    return truncate(d, {
      length: 240,
      separator: /.? +/,
    })
  }

  const getUrl = (p: Documentation) => `${BASE_URL}/${p.slug?.current || ""}`

  const getImage = (p: Documentation) => {
    if (!p.slideshow) return DEFAULT_IMAGE
    const firstImage = p.slideshow.find(item => item._type === "image") as Image
    if (firstImage && firstImage.asset && firstImage.asset._ref) {
      return urlFor(firstImage.asset._ref).width(800).quality(90).url()
    } else {
      return DEFAULT_IMAGE
    }
  }

  let title = post ? getTitle(post) : BASE_TITLE
  let description = post ? getDescription(post) : DEFAULT_DESCRIPTION
  let url = post ? getUrl(post) : BASE_URL
  let image = post ? getImage(post) : DEFAULT_IMAGE
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={url} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="article" />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={title} />
  <meta property="og:title" content={title} />
  <meta property="description" content={description} />
  <meta property="og:description" content={description} />
  <meta property="image" content={image} />
  <meta property="og:image" content={image} />
  <meta property="twitter:image" content={image} />
  <meta property="og:site_name" content={BASE_TITLE} />
</svelte:head>
