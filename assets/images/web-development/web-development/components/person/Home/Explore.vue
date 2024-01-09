<template>
  <div class="explore">
    <a-card class="explore-card" :bordered="false">
      <p class="all-main-heading">{{ $t('person.ph1') }}</p>
      <!-- <a-input :placeholder="$t('placeholders.plh32')">
        <div slot="prefix">
          <img src="/images/search-icon.svg" />
        </div>
      </a-input> -->
      <nuxt-link :to="selfRoute.rewardHub">
        <div class="services-bg">
          <a-row>
            <a-col :lg="12">
              <img src="/images/explore-b-logo.svg" />
              <p class="s-title fw-5 mb-1 mt-2">{{ $t('tableskeys.bh2') }}</p>
          <p class="s-heading fw-7 text-black mb-0">{{ $t('person.win_rebates_and_gift') }}</p>
            </a-col>
          </a-row>
      
        </div>
      </nuxt-link>
    </a-card>
  </div>
</template>

<script>
export default {
  computed: {
    selfRoute: function () {
      return this.$store.state.route
    },
  },
}
</script>

<style></style>
