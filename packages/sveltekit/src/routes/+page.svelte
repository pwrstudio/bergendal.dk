<script lang="ts">
  import type { About, ContributionsToResearch, TextAndArchive, MainPageTop } from "@sanity-types"
  import type { WorkExpanded, CvAndContactExpanded } from "$lib/types"
  import { beforeNavigate, afterNavigate } from "$app/navigation"
  import { saveScrollPosition, restoreScrollPosition } from "$lib/stores/scroll"

  let {
    data
  }: {
    data: {
      about: About
      mainPageTop: MainPageTop
      cvAndContact: CvAndContactExpanded
      textAndArchive: TextAndArchive
      contributionsToResearch: ContributionsToResearch
      works: WorkExpanded[]
    }
  } = $props()

  const { about, mainPageTop, cvAndContact, textAndArchive, contributionsToResearch, works } = data

  import MainPageTopComponent from "$lib/components/MainPageTop.svelte"
  import WorksComponent from "$lib/components/Works.svelte"
  import AboutComponent from "$lib/components/About.svelte"
  import ListingComponent from "$lib/components/Listing.svelte"
  import CvAndContactComponent from "$lib/components/CvAndContact.svelte"
  import Metadata from "$lib/components/subs/Metadata.svelte"

  // Save scroll position before navigating away from main page
  beforeNavigate(({ from }) => {
    if (from?.route.id === "/") {
      saveScrollPosition("/")
    }
  })

  // Restore scroll position when returning to main page
  afterNavigate(({ from, to, type }) => {
    // Only restore if we're navigating TO the main page FROM another page
    if (to?.route.id === "/" && from?.route.id && from.route.id !== "/") {
      restoreScrollPosition("/")
    }
  })
</script>

<Metadata />

<div class="main-column">
  <AboutComponent {about} />
  <!-- <MainPageTopComponent {mainPageTop} /> -->
  <WorksComponent {works} />
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
  }
</style>
