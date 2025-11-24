<script lang="ts">
  import type { Documentation } from "@sanity-types"

  let {
    data
  }: {
    data: {
      post: Documentation
    }
  } = $props()

  const { post } = data

  import DocumentationComponent from "$lib/components/Documentation.svelte"
  import Metadata from "$lib/components/subs/Metadata.svelte"
</script>

<Metadata {post} />

<DocumentationComponent {post} />
