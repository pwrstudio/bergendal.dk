import { MdTextFields } from "react-icons/md"
import { blocksToText, truncateString } from "./utils"

export default {
    title: "CV & Contact",
    name: "cvAndContact",
    type: "document",
    fields: [
        {
            title: "Titel",
            name: "title",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            title: "Portrait Photo",
            name: "portraitPhoto",
            type: "image",
            description: "Small portrait photo displayed in the CV section",
        },
        {
            title: 'CV',
            name: 'cv',
            type: 'array',
            of: [
                {
                    title: 'CV field',
                    type: 'object',
                    name: 'field',
                    icon: MdTextFields,
                    fields: [
                        {
                            title: 'Title',
                            name: 'title',
                            type: 'string',
                        },
                        {
                            title: "Content",
                            name: "content",
                            type: "contentEditor",
                        },
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            content: 'content'
                        },
                        prepare(selection: { title?: string; content?: { content?: any[] } }) {
                            const { title, content } = selection
                            const truncatedContent = content?.content ? truncateString(blocksToText(content.content), 50) : ""
                            return {
                                title: `(${(title ?? "").toUpperCase()}) ${truncatedContent}`
                            }
                        }
                    }
                },
            ],
        },
        {
            title: "Full CV (pdf)",
            name: "fullCV",
            type: "file",
            options: {
                accept: ".pdf"
            }
        },
    ],
}