import { MdFolder } from "react-icons/md"

export default {
    title: "Work List",
    name: "workList",
    icon: MdFolder,
    type: "document",
    fields: [
        {
            title: "Titel",
            name: "title",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            title: 'Works',
            name: 'works',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'work' }] }]
        }
    ]
}