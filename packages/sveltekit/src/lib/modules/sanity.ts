// * * * * * * * * * * * * * * * * * * * * * * * * * * *
//
//  sanity.ts =>
//  functions to work with the Sanity database
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * *

import { createClient } from "@sanity/client"
import { toHTML } from "@portabletext/to-html"
import imageUrlBuilder from "@sanity/image-url"
import type { PortableTextBlock } from "@portabletext/types"

const SANITY_ID = "5pk6dy85"

export const client = createClient({
  projectId: SANITY_ID,
  dataset: "production",
  apiVersion: "2025-11-01", // use a UTC date string
  useCdn: false
})

function transformFileString(fileString: string): string {
  // Remove the "file-" prefix
  let trimmedString = fileString.replace("file-", "")

  // Replace the last hyphen with a dot
  let lastIndex = trimmedString.lastIndexOf("-")
  if (lastIndex !== -1) {
    trimmedString =
      trimmedString.substring(0, lastIndex) + "." + trimmedString.substring(lastIndex + 1)
  }

  return trimmedString
}

export const renderBlockText = (blocks: any) => {
  return toHTML(blocks as PortableTextBlock[], {
    components: {
      marks: {
        link: ({ children, value }) => {
          const href = value?.href || ""
          const external = href.includes("http")
          const attrs = external
            ? `href="${href}" target="_blank" rel="noreferrer"`
            : `href="${href}"`
          return `<a ${attrs}>${children}</a>`
        },
        pdf: ({ children, value }) => {
          const BASE_URL = `https://cdn.sanity.io/files/${SANITY_ID}/production/`
          const fileRef = value?.file?.asset?._ref || ""
          const fileUrl = BASE_URL + transformFileString(fileRef)
          return `<a href="${fileUrl}" target="_blank" rel="noopener noreferrer">${children}</a>`
        }
      },
      block: {
        normal: ({ children }) => `<p>${children}</p>`,
        textSizeSmall: ({ children }) => `<p class="text-size-small">${children}</p>`,
        textSizeMedium: ({ children }) => `<p class="text-size-medium">${children}</p>`,
        textSizeLarge: ({ children }) => `<p class="text-size-large">${children}</p>`,
        blockquote: ({ children }) => `<blockquote>${children}</blockquote>`,
        h2: ({ children }) => `<h2>${children}</h2>`,
        h3: ({ children }) => `<h3>${children}</h3>`
      },
      types: {
        image: ({ value }) => {
          if (!value?.asset?._ref) return ""
          const imageUrl = urlFor(value).url()
          return `<figure><img src="${imageUrl}" alt="${value.alt || ""}" /></figure>`
        }
      }
    }
  })
}

export const toPlainText = (blocks: any[]) => {
  return blocks
    .map((block: any) => {
      if (block._type !== "block" || !block.children) {
        return ""
      }
      return block.children.map((child: any) => child.text).join("")
    })
    .join("\n\n")
}

export const loadData = async (query: string, params: any) => {
  try {
    const res = await client.fetch(query, params)
    if (res === null) {
      return Promise.reject(new Error("404: Content not found"))
    }
    return res
  } catch (err) {
    return Promise.reject(new Error("404: Content not found"))
  }
}

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)
