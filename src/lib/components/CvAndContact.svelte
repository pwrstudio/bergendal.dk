<script lang="ts">
  import { renderBlockText } from "$lib/modules/sanity"
  import type { CvAndContact } from "$lib/types/sanity.types"
  export let cvAndContact: CvAndContact
</script>

<!-- CV & CONTACT-->
<div id="cv-and-contact" class="column-section">
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
    <div class="cv-contact-content-row">
      FULL CV >>>
      <!-- <a href='cv-and-contact/{{contact.header.pdf}}' target=_blank class='cv-contact-content-row-title'>FULL CV >></div> -->
    </div>
  </div>
</div>

<style lang="scss">
  @import "../styles/responsive.scss";

  .cv-contact-content-row {
    display: flex;
    margin-bottom: 20px;
    @include screen-size("small") {
      flex-wrap: wrap;
    }
  }

  .cv-contact-content-row-title {
    width: 200px;
    @include screen-size("small") {
      width: 100%;
    }
  }

  .cv-contact-content-row-content {
    width: calc(100% - 200px);
    @include screen-size("small") {
      width: 100%;
    }
  }

  .cv-contact-title {
    font-family: var(--font-family-extended);
    font-size: var(--font-size-medium);
    margin-bottom: 20px;
  }
</style>
