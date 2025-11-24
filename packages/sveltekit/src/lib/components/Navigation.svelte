<script lang="ts">
  import Burger from "$lib/components/subs/Burger.svelte"

  let mobileNavigationActive = $state(false)

  function toggleMobileNavigation() {
    mobileNavigationActive = !mobileNavigationActive
  }
</script>

<!-- About -->
<a href="#about" class="navigation--link navigation--link--fixed about"> About </a>

<!-- CV & Contact -->
<a href="#cv-and-contact" class="navigation--link navigation--link--fixed cv-contact">
  CV & Contact
</a>

<!-- Work -->
<a href="#work" class="navigation--link navigation--link--fixed work">Work</a>

<!-- Text & Archive and  Contributions to research -->
<div class="navigation--link--fixed text-archive-research">
  <a class="navigation--link" href="#text-and-archive">Text & Archive</a>
  /
  <a class="navigation--link" href="#contributions-to-research"> Contributions to research </a>
</div>

<!-- Mobile navigation -->
<div class="mobile-navigation">
  {#if mobileNavigationActive}
    <div id="mobile-navigation-container" class="mobile-navigation-container">
      <!-- Work -->
      <a
        href="#work"
        class="navigation--link navigation--link--mobile"
        onclick={toggleMobileNavigation}
      >
        Work
      </a>
      <!-- About -->
      <a
        href="#about"
        class="navigation--link navigation--link--mobile"
        onclick={toggleMobileNavigation}
      >
        About
      </a>
      <!-- Text & Archive -->
      <a
        href="#text-and-archive"
        class="navigation--link navigation--link--mobile"
        onclick={toggleMobileNavigation}
      >
        Text & Archive
      </a>
      <!-- Contributions to research -->
      <a
        href="#contributions-to-research"
        class="navigation--link navigation--link--mobile"
        onclick={toggleMobileNavigation}
      >
        Contributions to research
      </a>
      <!-- CV & Contact -->
      <a
        href="#cv-and-contact"
        class="navigation--link navigation--link--mobile"
        onclick={toggleMobileNavigation}
      >
        CV & Contact
      </a>
    </div>
  {/if}

  <!-- Burger -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div id="burger" class="navigation--burger" onclick={toggleMobileNavigation}>
    <Burger />
  </div>
</div>

<style lang="scss">
  @use "../styles/responsive.scss" as *;

  $navigation-vertical-spacing: 30px;
  $navigation-horizontal-spacing: 30px;

  .navigation--link {
    color: var(--green);
    cursor: pointer;
    text-decoration: underline;
    font-family: var(--font-family-normal);
    user-select: none;

    &:hover {
      text-decoration: none;
    }
  }

  .navigation--link--fixed {
    position: fixed;
    font-family: var(--font-family-normal);
    color: var(--green);

    &.about {
      top: $navigation-vertical-spacing + 40px;
      left: $navigation-horizontal-spacing + 20px;
      transform-origin: bottom left;
      transform: rotateZ(-90deg);
    }

    &.cv-contact {
      bottom: $navigation-vertical-spacing;
      left: $navigation-horizontal-spacing;
      transform-origin: top left;
      transform: rotateZ(-90deg);
    }

    &.work {
      top: $navigation-vertical-spacing + 10px;
      right: $navigation-horizontal-spacing;
    }

    &.text-archive-research {
      bottom: $navigation-vertical-spacing;
      right: $navigation-horizontal-spacing + 20px;
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
</style>
