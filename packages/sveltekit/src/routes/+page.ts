import { loadData } from "$lib/modules/sanity"
import { queries } from "$lib/groq"
import type { MainPageData } from "$lib/types"
import type { PageLoad } from "./$types"

export const load: PageLoad = async () => {
  const data: MainPageData = await loadData(queries.mainPageData, {})
  return {
    about: data.about,
    mainPageTop: data.mainPageTop,
    cvAndContact: data.cvAndContact,
    textAndArchive: data.textAndArchive,
    contributionsToResearch: data.contributionsToResearch,
    works: data.workList?.works ?? []
  }
}
