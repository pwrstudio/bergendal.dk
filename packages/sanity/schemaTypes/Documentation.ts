import { MdImage, MdVideoLibrary } from "react-icons/md"

export default {
  title: "Documentation",
  name: "documentation",
  icon: MdImage,
  type: "document",
  fields: [
    {
      title: "Titel",
      name: "title",
      type: "string",
      validation: (Rule: any) => Rule.required()
    },
    {
      title: "Subtitle",
      name: "subtitle",
      type: "string",
      description: "Optional subtitle for internal organization. Not shown on frontend."
    },
    {
      title: "Start year",
      name: "startYear",
      type: "number"
    },
    {
      title: "End year",
      name: "endYear",
      type: "number"
    },
    {
      name: "content",
      title: "Content",
      type: "contentEditor"
    },
    {
      title: "Slideshow",
      name: "slideshow",
      type: "array",
      of: [
        {
          title: "Image",
          name: "image",
          icon: MdImage,
          type: "image",
          fields: [
            {
              title: "Year",
              name: "year",
              type: "number"
            },
            {
              title: "Caption",
              name: "caption",
              type: "string"
            }
          ]
        },
        {
          type: "object",
          name: "video",
          title: "Video",
          icon: MdVideoLibrary,
          fields: [
            {
              name: "url",
              type: "url",
              title: "URL",
              description: "Youtube or vimeo. Eg. https://www.youtube.com/watch?v=GAKetEPZb8c"
            },
            {
              title: "Year",
              name: "year",
              type: "number"
            },
            {
              title: "Caption",
              name: "caption",
              type: "string"
            }
          ]
        }
      ]
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "slideshow.0"
    },
    prepare(selection: any) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: subtitle || "",
        media: selection.media
      }
    }
  }
}
