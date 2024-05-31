<script lang="ts">
  import type { Work } from "$lib/types/sanity.types"
  export let works: Work[]

  import WorkComponent from "$lib/components/subs/Work.svelte"
</script>

<div id="work">
  {#each works as work}
    <WorkComponent {work} />
  {/each}
</div>
