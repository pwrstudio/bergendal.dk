import type {
    About,
    MainPageTop,
    WorkList,
    CvAndContact,
    TextAndArchive,
    ContributionsToResearch,
    Work,
    Documentation,
    SanityImageCrop,
    SanityImageHotspot
} from '@sanity-types'

// Extract Image type from Documentation slideshow
export type Image = {
    asset?: {
        _ref: string
        _type: 'reference'
        _weak?: boolean
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    year?: number
    caption?: string
    _type: 'image'
    _key: string
}

// Extended type for Work with dereferenced Documentation
export type WorkExpanded = Omit<Work, 'documentation'> & {
    documentation?: Array<Documentation>
}

// Extended type for WorkList with dereferenced Works
export type WorkListExpanded = Omit<WorkList, 'works'> & {
    works?: Array<WorkExpanded>
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

