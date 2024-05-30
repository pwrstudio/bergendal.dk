<script lang="ts">
  import { page } from "$app/stores"
  import { onNavigate } from "$app/navigation"

  onNavigate(navigation => {
    if (!document.startViewTransition) return

    return new Promise(resolve => {
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      })
    })
  })

  import NavigationComponent from "$lib/components/Navigation.svelte"
</script>

<!-- Only show navigation on the home page -->
{#if $page.route.id === "/"}
  <NavigationComponent />
{/if}

<slot></slot>
