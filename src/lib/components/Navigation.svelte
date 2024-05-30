<script lang="ts">
  import Burger from "$lib/components/subs/Burger.svelte"

  let mobileNavigationActive = false

  function toggleMobileNavigation() {
    mobileNavigationActive = !mobileNavigationActive
  }
</script>

<!-- About -->
<a href="#about" class="navigation--link navigation--link--fixed about">
  About
</a>

<!-- CV & Contact -->
<a
  href="#cv-and-contact"
  class="navigation--link navigation--link--fixed cv-contact"
>
  CV & Contact
</a>

<!-- Work -->
<a href="#work" class="navigation--link navigation--link--fixed work">Work</a>

<!-- Text & Archive and  Contributions to research -->
<div class="navigation--link--fixed text-archive-research">
  <a class="navigation--link" href="#text-and-archive">Text & Archive</a>
  /
  <a class="navigation--link" href="#contributions-to-research">
    Contributions to research
  </a>
</div>

<!-- Mobile navigation -->
<div class="mobile-navigation">
  {#if mobileNavigationActive}
    <div id="mobile-navigation-container" class="mobile-navigation-container">
      <!-- Work -->
      <a
        href="#work"
        class="navigation--link navigation--link--mobile"
        on:click={toggleMobileNavigation}
      >
        Work
      </a>
      <!-- About -->
      <a
        href="#about"
        class="navigation--link navigation--link--mobile"
        on:click={toggleMobileNavigation}
      >
        About
      </a>
      <!-- Text & Archive -->
      <a
        href="#text-and-archive"
        class="navigation--link navigation--link--mobile"
        on:click={toggleMobileNavigation}
      >
        Text & Archive
      </a>
      <!-- Contributions to research -->
      <a
        href="#contributions-to-research"
        class="navigation--link navigation--link--mobile"
        on:click={toggleMobileNavigation}
      >
        Contributions to research
      </a>
      <!-- CV & Contact -->
      <a
        href="#cv-and-contact"
        class="navigation--link navigation--link--mobile"
        on:click={toggleMobileNavigation}
      >
        CV & Contact
      </a>
    </div>
  {/if}

  <!-- Burger -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div id="burger" class="navigation--burger" on:click={toggleMobileNavigation}>
    <Burger />
  </div>
</div>

<style lang="scss">
  @import "../styles/responsive.scss";

  .navigation--link {
    color: var(--green);
    cursor: pointer;
    text-decoration: underline;
    font-family: var(--font-family-normal);

    &:hover {
      text-decoration: none;
    }

    &.active {
      text-decoration: none !important;
    }
  }

  .navigation--link--fixed {
    position: fixed;
    font-family: var(--font-family-normal);
    color: var(--green);

    &.about {
      top: var(--navigation-vertical-spacing);
      left: var(--navigation-horizontal-spacing);
      transform-origin: bottom left;
      transform: rotateZ(-90deg);
    }

    &.cv-contact {
      bottom: var(--navigation-vertical-spacing);
      left: var(--navigation-horizontal-spacing);
      transform-origin: top left;
      transform: rotateZ(-90deg);
    }

    &.work {
      top: var(--navigation-vertical-spacing);
      right: var(--navigation-horizontal-spacing);
    }

    &.text-archive-research {
      bottom: var(--navigation-vertical-spacing);
      right: var(--navigation-horizontal-spacing);
      transform-origin: bottom right;
      transform: rotateZ(90deg);
    }

    @include screen-size("small") {
      display: none;
    }
  }

  .mobile-navigation {
    box-shadow: 0px 0px 10px var(--grey);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: var(--background);
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 30px;
    padding-left: 30px;
    font-family: var(--font-family-normal);
    font-size: var(--font-size-medium);
    z-index: 10;
    display: none;

    @include screen-size("small") {
      display: block;
    }
  }

  .mobile-navigation-container {
    margin-bottom: 7px;

    &.active {
      display: block;
    }
  }

  .navigation--link--mobile {
    display: block;
    margin-bottom: 1em;
  }

  .navigation--burger {
    position: relative;
    left: -2px;
    cursor: pointer;
    float: left;
  }

  .work-documentation-popover-mobile-bar-nav {
    position: absolute;
    left: 50%;
    margin-left: -50px;
  }

  .work-documentation-popover-mobile-bar-dot {
    float: left;
    padding-right: 10px;

    svg {
      position: relative;
      top: 6px;
      height: 20px;
    }

    &:hover {
      fill: var(--green);
      cursor: pointer;
    }
  }
</style>
