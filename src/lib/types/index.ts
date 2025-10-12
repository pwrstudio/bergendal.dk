import type { 
    About, 
    MainPageTop, 
    WorkList, 
    CvAndContact, 
    TextAndArchive, 
    ContributionsToResearch,
    Work,
    Documentation 
} from './sanity.types'

// Extended type for WorkList with dereferenced Works
export type WorkListExpanded = Omit<WorkList, 'works'> & {
    works?: Array<Work & {
        documentation?: Array<Documentation>
    }>
}

// Extended type for CvAndContact with fullCVUrl
export type CvAndContactExpanded = CvAndContact & {
    fullCVUrl?: string
}

// Type for the combined main page data query
export type MainPageData = {
    about: About
    mainPageTop: MainPageTop
    workList: WorkListExpanded
    cvAndContact: CvAndContactExpanded
    textAndArchive: TextAndArchive
    contributionsToResearch: ContributionsToResearch
}

