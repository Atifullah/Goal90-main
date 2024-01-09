<template>
  <div>
    <img :src="!canAdvanceBackward ? '/images/disable-left-img.svg' : '/images/active-left-img.svg'"
      aria-label="Previous page"
      role="button"
      class="VueCarousel-navigation-prev VueCarousel-navigation-button"
      v-on:click.prevent="triggerPageAdvance('backward')"
      v-bind:style="`padding: ${clickTargetSize}px; margin-right: -${clickTargetSize}px;`"
      />
      <img :src="!canAdvanceForward ? '/images/disable-right-img.svg' : '/images/active-right-img.svg'"
      aria-label="Next page"
      role="button"
      class="VueCarousel-navigation-button VueCarousel-navigation-next"
      v-on:click.prevent="triggerPageAdvance()"
      v-bind:class="{ 'VueCarousel-navigation--disabled': !canAdvanceForward }"
      v-bind:style="`padding: ${clickTargetSize}px; margin-left: -${clickTargetSize}px;`"
        />
  </div>
</template>

<script>
export default {
  name: "navigation",
  inject: ["carousel"],
  props: {
    /**
     * Amount of padding to apply around the label in pixels
     */
    clickTargetSize: {
      type: Number,
      default: 8
    },
    /**
     * Text content of the navigation next button
     */
    nextLabel: {
      type: String,
      default: "&#9654"
    },
    /**
     * Text content of the navigation prev button
     */
    prevLabel: {
      type: String,
      default: "&#9664"
    }
  },
  computed: {
    /**
     * @return {Boolean} Can the slider move forward?
     */
    canAdvanceForward() {
      return this.carousel.canAdvanceForward || false;
    },
    /**
     * @return {Boolean} Can the slider move backward?
     */
    canAdvanceBackward() {
      return this.carousel.canAdvanceBackward || false;
    }
  },
  methods: {
    /**
     * Trigger page change on +/- 1 depending on the direction
     * @param {"backward"} [direction]
     * @return {void}
     */
    triggerPageAdvance(direction) {
      /**
       * @event paginationclick
       * @type {string}
       */
      this.$emit("navigationclick", direction);
    }
  }
};
</script>

<style scoped>

.VueCarousel-navigation-button {
  position: absolute;
  top: 50%;
  box-sizing: border-box;
  text-decoration: none;
  appearance: none;
  border: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  outline: none;
}

.VueCarousel-navigation-next {
  
  right: 0;
  transform: translateY(-50%) translateX(100%);
  font-family: "system";
}

.VueCarousel-navigation-prev {
  left: 0;
  transform: translateY(-50%) translateX(-100%);
  font-family: "system";
}

.VueCarousel-navigation--disabled {
  opacity: 0.5;
  cursor: default;
}

/* Define the "system" font family */
@font-face {
  font-family: system;
  font-style: normal;
  font-weight: 300;
  src: local(".SFNSText-Light"), local(".HelveticaNeueDeskInterface-Light"),
    local(".LucidaGrandeUI"), local("Ubuntu Light"), local("Segoe UI Symbol"),
    local("Roboto-Light"), local("DroidSans"), local("Tahoma");
}
</style>
