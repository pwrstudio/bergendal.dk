<script lang="ts">
  import type { WorkExpanded } from "$lib/types"

  let { works }: { works: WorkExpanded[] } = $props()

  import WorkComponent from "$lib/components/subs/Work.svelte"
</script>

<div id="work">
  {#each works as work}
    <WorkComponent {work} />
  {/each}
</div>
