import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { MainPageData } from "$lib/types"

/** @type {import('./$types').PageLoad} */
export async function load() {
    const data: MainPageData = await loadData(queries.mainPageData, {})
    return {
        about: data.about,
        mainPageTop: data.mainPageTop,
        cvAndContact: data.cvAndContact,
        textAndArchive: data.textAndArchive,
        contributionsToResearch: data.contributionsToResearch,
        works: data.workList?.works ?? []
    };
}