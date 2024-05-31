export const queries = {
    works: "*[_type == 'work'] {..., documentation[]->{...}}",
    about: "*[_id == 'about'][0]",
    mainPageTop: "*[_id == 'mainPageTop'][0]",
    cvAndContact: "*[_id == 'cvAndContact'][0] {..., 'fullCVUrl': fullCV.asset->url}",
    textAndArchive: "*[_id == 'textAndArchive'][0]",
    contributionsToResearch: "*[_id == 'contributionsToResearch'][0]",
    documentation: "*[_type == 'documentation' && slug.current == $slug][0]",
}