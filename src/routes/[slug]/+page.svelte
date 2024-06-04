<script lang="ts">
  import type { Documentation } from "$lib/types/sanity.types"

  export let data: {
    post: Documentation
  }

  const { post } = data

  import DocumentationComponent from "$lib/components/Documentation.svelte"
  import Metadata from "$lib/components/subs/Metadata.svelte"
</script>

<Metadata {post} />

<DocumentationComponent {post} />
