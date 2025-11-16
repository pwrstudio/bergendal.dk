import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { Documentation } from "@sanity-types"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const post: Documentation = await loadData(queries.documentation, { slug: params.slug })
    return {
        post
    };
}