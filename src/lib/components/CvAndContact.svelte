<script lang="ts">
  import { renderBlockText } from "$lib/modules/sanity"
  import type { CvAndContact } from "$lib/types/sanity.types"
  export let cvAndContact: CvAndContact
</script>

<!-- CV & CONTACT-->
<div id="cv-and-contact" class="column-section cv-contact">
  <div class="cv-contact-title">CV / KERSTIN BERGENDAL</div>

  <!-- CV -->
  <div class="cv-contact-content">
    {#each cvAndContact?.cv ?? [] as field}
      <div class="cv-contact-content-row">
        <div class="cv-contact-content-row-title">{field.title}</div>
        <div class="cv-contact-content-row-content">
          {@html renderBlockText(field.content?.content ?? [])}
        </div>
      </div>
    {/each}

    <!-- PDF -->
    {#if cvAndContact?.fullCVUrl}
      <div class="cv-contact-content-row link">
        <a href={cvAndContact.fullCVUrl} target="_blank">FULL CV >>></a>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../styles/responsive.scss";

  .cv-contact {
    font-family: var(--font-family-extended);
    font-size: var(--font-size-medium);
  }

  .cv-contact-content-row {
    display: flex;
    margin-bottom: 1em;
    @include screen-size("small") {
      flex-wrap: wrap;
    }

    .cv-contact-content-row-title {
      width: 160px;
      text-transform: uppercase;
      @include screen-size("small") {
        width: 100%;
      }
    }

    .cv-contact-content-row-content {
      width: calc(100% - 160px);
      @include screen-size("small") {
        width: 100%;
      }
    }
  }

  .cv-contact-title {
    margin-bottom: 20px;
  }

  :global(.cv-contact-content-row a) {
    color: var(--green);
    text-decoration: none;
    &:hover {
      color: var(--foreground);
    }
  }

  :global(.cv-contact-content-row-content p) {
    margin: 0;
  }
</style>
