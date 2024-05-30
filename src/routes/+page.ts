import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { Work, About, CvAndContact, ContributionsToResearch, TextAndArchive, MainPageTop } from "$lib/types/sanity.types"

/** @type {import('./$types').PageLoad} */
export async function load() {
    const about: About = await loadData(queries.about, {})
    const mainPageTop: MainPageTop = await loadData(queries.mainPageTop, {})
    const works: Work[] = await loadData(queries.works, {})
    const cvAndContact: CvAndContact = await loadData(queries.cvAndContact, {})
    const textAndArchive: TextAndArchive = await loadData(queries.textAndArchive, {})
    const contributionsToResearch: ContributionsToResearch = await loadData(queries.contributionsToResearch, {})

    return {
        about,
        mainPageTop,
        cvAndContact,
        textAndArchive,
        contributionsToResearch,
        works
    };
}