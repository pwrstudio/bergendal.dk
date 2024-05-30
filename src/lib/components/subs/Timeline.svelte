<script lang="ts">
  export let startYear: number | undefined
  export let endYear: number | undefined

  // Default to current year if no end year is provided
  if (!endYear) {
    endYear = new Date().getFullYear()
  }
</script>

{#if startYear}
  <div class="timeline">
    <div class="timeline-start">{startYear}</div>
    <div class="timeline-dots"></div>
    <div class="timeline-arrow"></div>
    <div class="timeline-end">{endYear}</div>
  </div>
{/if}

<style lang="scss">
  // Timeline
  .timeline {
    width: 100%;
    height: 20px;
    font-family: var(--font-family-normal);
    font-size: var(--font-size-small);
    margin-bottom: 30px;
    margin-top: 30px;
  }

  .timeline-start {
    float: left;
    height: 100%;
    width: 40px;
  }

  .timeline-end {
    float: right;
    height: 100%;
    width: 30px;
    text-align: right;
  }

  .timeline-dots {
    float: left;
    width: calc(100% - 90px);
    height: 50%;
    margin-top: 6px;
    background-image: url("/images/dot.svg");
  }

  .timeline-arrow {
    float: left;
    width: 20px;
    background-repeat: no-repeat;
    height: 80%;
    background-image: url("/images/arrow.svg");
  }
</style>
