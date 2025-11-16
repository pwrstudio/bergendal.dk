import {
    MdFolder,
    MdHome,
    MdMail,
    MdEditDocument,
    MdSchool,
    MdImage,
    MdStar,
    MdList
} from "react-icons/md"

export default (S: any, context: any) =>
    S.list()
        .title("bergendal.dk")
        .items([
            S.listItem()
                .title("Main Page Top")
                .icon(MdStar)
                .child(
                    S.editor()
                        .id("mainPageTop")
                        .title("Main Page Top")
                        .schemaType("mainPageTop")
                        .documentId("mainPageTop")
                ),
            S.divider(),
            S.listItem()
            .title("Work list")
            .icon(MdList)
            .child(
                S.editor()
                    .id("workList")
                    .title("Work list")
                    .schemaType("workList")
                    .documentId("workList")
            ),
            S.listItem()
                .title("Works")
                .icon(MdFolder)
                .child(
                    S.documentList()
                        .title('Works')
                        .showIcons(true)
                        .filter("_type == $type")
                        .params({ type: "work" })
                ),
            S.listItem()
                .title("Documentation")
                .icon(MdImage)
                .child(async () => {
                    // Fetch all works using the context client
                    const client = context.getClient({ apiVersion: '2025-11-01' })
                    const works = await client.fetch(`*[_type == "work"] | order(title asc) { _id, title, "documentation": documentation[]->._id }`)

                    // Get all referenced documentation IDs
                    const referencedDocIds = new Set(
                        works.flatMap((work: any) => work.documentation || [])
                    )

                    return S.list()
                        .title('Documentation')
                        .items([
                            // "All" folder
                            S.listItem()
                                .title('All')
                                .icon(MdImage)
                                .child(
                                    S.documentList()
                                        .title('All Documentation')
                                        .filter('_type == "documentation"')
                                        .showIcons(true)
                                ),

                            // "Not connected" folder
                            S.listItem()
                                .title('Not connected')
                                .icon(MdImage)
                                .child(
                                    S.documentList()
                                        .title('Not connected to any Work')
                                        .filter('_type == "documentation" && !(_id in $ids)')
                                        .params({ ids: Array.from(referencedDocIds) })
                                        .showIcons(true)
                                ),

                            S.divider(),

                            // One folder per Work
                            ...works.map((work: any) =>
                                S.listItem()
                                    .title(work.title)
                                    .icon(MdFolder)
                                    .child(
                                        S.documentList()
                                            .title(`${work.title} - Documentation`)
                                            .filter('_type == "documentation" && _id in $ids')
                                            .params({ ids: work.documentation || [] })
                                            .showIcons(true)
                                    )
                            )
                        ])
                }),
            S.divider(),
            S.listItem()
                .title("About")
                .icon(MdHome)
                .child(
                    S.editor()
                        .id("about")
                        .title("About")
                        .schemaType("about")
                        .documentId("about")
                ),
            S.listItem()
                .title("Text and Archive")
                .icon(MdEditDocument)
                .child(
                    S.editor()
                        .id("textAndArchive")
                        .title("Text and Archive")
                        .schemaType("textAndArchive")
                        .documentId("textAndArchive")
                ),
            S.listItem()
                .title("Contributions to Research")
                .icon(MdSchool)
                .child(
                    S.editor()
                        .id("contributionsToResearch")
                        .title("Contributions to Research")
                        .schemaType("contributionsToResearch")
                        .documentId("contributionsToResearch")
                ),
            S.listItem()
                .title("CV & Contact")
                .icon(MdMail)
                .child(
                    S.editor()
                        .id("cvAndContact")
                        .title("CV & Contact")
                        .schemaType("cvAndContact")
                        .documentId("cvAndContact")
                ),
        ])

