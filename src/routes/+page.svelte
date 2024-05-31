<script lang="ts">
  import type {
    Work,
    About,
    CvAndContact,
    ContributionsToResearch,
    TextAndArchive,
    MainPageTop,
  } from "$lib/types/sanity.types"

  export let data: {
    about: About
    mainPageTop: MainPageTop
    cvAndContact: CvAndContact
    textAndArchive: TextAndArchive
    contributionsToResearch: ContributionsToResearch
    works: Work[]
  }

  const {
    about,
    mainPageTop,
    cvAndContact,
    textAndArchive,
    contributionsToResearch,
    works,
  } = data

  import MainPageTopComponent from "$lib/components/MainPageTop.svelte"
  import WorksComponent from "$lib/components/Works.svelte"
  import AboutComponent from "$lib/components/About.svelte"
  import ListingComponent from "$lib/components/Listing.svelte"
  import CvAndContactComponent from "$lib/components/CvAndContact.svelte"
</script>

<div class="main-column">
  <MainPageTopComponent {mainPageTop} />
  <WorksComponent {works} />
  <AboutComponent {about} />
  <ListingComponent page={textAndArchive} />
  <ListingComponent page={contributionsToResearch} />
  <CvAndContactComponent {cvAndContact} />
</div>

<style lang="scss">
  .main-column {
    width: 800px;
    max-width: 85vw;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 100px;

    img {
      max-width: 100%;
    }

    iframe {
      width: 100%;
      display: block;
    }
  }
</style>
