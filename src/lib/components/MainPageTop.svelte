<script lang="ts">
  import { urlFor } from "$lib/modules/sanity"
  import type { MainPageTop } from "$lib/types/sanity.types"
  export let mainPageTop: MainPageTop

  import TimeLine from "$lib/components/subs/TimeLine.svelte"
</script>

<div class="column-section">
  <!-- IMAGE -->
  <img
    src={urlFor(mainPageTop.featuredImage).url()}
    alt="Kerstin Bergendal"
    class="work-intro-image"
  />
  <!-- TIMELINE -->
  <TimeLine startYear={mainPageTop.startYear} endYear={mainPageTop.endYear} />
</div>
