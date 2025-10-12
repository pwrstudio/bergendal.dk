export const queries = {
    works: "*[_type == 'work'] {..., documentation[]->{...}}",
    workList: "*[_type == 'workList'] {..., works[]->{..., documentation[]->{...}}}",
    about: "*[_id == 'about'][0]",
    mainPageTop: "*[_id == 'mainPageTop'][0]",
    cvAndContact: "*[_id == 'cvAndContact'][0] {..., 'fullCVUrl': fullCV.asset->url}",
    textAndArchive: "*[_id == 'textAndArchive'][0]",
    contributionsToResearch: "*[_id == 'contributionsToResearch'][0]",
    documentation: "*[_type == 'documentation' && slug.current == $slug][0]",
    mainPageData: `{
        "about": *[_id == 'about'][0],
        "mainPageTop": *[_id == 'mainPageTop'][0],
        "workList": *[_type == 'workList'] {..., works[]->{..., documentation[]->{...}}}[0],
        "cvAndContact": *[_id == 'cvAndContact'][0] {..., 'fullCVUrl': fullCV.asset->url},
        "textAndArchive": *[_id == 'textAndArchive'][0],
        "contributionsToResearch": *[_id == 'contributionsToResearch'][0]
    }`,
}