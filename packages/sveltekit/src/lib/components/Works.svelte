<script lang="ts">
  import type { WorkExpanded } from "$lib/types"
  export let works: WorkExpanded[]

  import WorkComponent from "$lib/components/subs/Work.svelte"
</script>

<div id="work">
  {#each works as work}
    <WorkComponent {work} />
  {/each}
</div>
