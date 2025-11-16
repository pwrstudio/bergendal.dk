import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { Documentation } from "@sanity-types"
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
    const post: Documentation = await loadData(queries.documentation, { slug: params.slug })
    return {
        post
    }
}