<template>
  <a-row :gutter="16">
    <a-col :lg="15" :xl="16">
      <p class="help-center-heading fw-5 mb-0">{{ firstBreadcrumbTitle }}</p>
    </a-col>
    <a-col :lg="9" :xl="8" class="help-search-bar">
      <a-input-search :placeholder="$t('placeholders.plh22')" enter-button="Search" size="large" @search="onSearch" />
    </a-col>
  </a-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    breadCrumbs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
    };
  },
  watch: {
    handler: function () {
      this.firstBreadcrumbTitle()
  },
  immediate: true, // Trigger the handler immediately
  deep: true
},
computed: {
    ...mapGetters('article', ['getSubItems', 'getArticleChildren', 'getCurrentChannel']),
    selfRoute: function () {
      return this.$store.state.route
    },
  subItems: function () {
    return this.getSubItems ? this.getSubItems : []
  },
  channels: function () {
    return this.getArticleChildren
  },
  currentChannel: function () {
    return this.getCurrentChannel
  },
  firstBreadcrumbTitle() {
    // Check if breadCrumbs is defined and not empty
    const annoucementRoute =this.$route.path;
    if (this.breadCrumbs && this.breadCrumbs.length > 0) {
          const annoucementRoute = this.$route.path;

      // Check if route's channelId is 16 and set the title accordingly
      if (annoucementRoute.trim() === '/help-dashboard/16') {
        return this.$t('returntxt.rtxt49');
      } else {
        // Return the title of the first breadcrumb
        return this.breadCrumbs[0].title;
      }
    }

      return this.$t('returntxt.rtxt49');  },


},


methods: {
  onSearch: function (val) {
    //console.log('VALL', val)
    window.location.href = this.selfRoute.searchResult + '?query=' + val
  },
}

}
</script>

<style lang="scss" scoped></style>