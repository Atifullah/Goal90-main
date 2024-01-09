<template>
  <div>
    <TopBanner />
    <NewsAlert />
    <BottomBanner />
    <PopularCryptocurrencies />
    <CopyTrading />
    <ProductSuite />
    <BeginnerGuide />
    <Community />
    <BuyBnqNow v-if="loggedIn" />

    <BuyBnqNowGuest v-else />
  </div>
</template>

<script>
import TopBanner from './TopBanner'
import NewsAlert from './NewsAlert'
import PopularCryptocurrencies from './PopularCryptocurrencies'
import CopyTrading from './CopyTrading'
import ProductSuite from './ProductSuite.vue'
import BeginnerGuide from './BeginnerGuide.vue'
import Community from './Community.vue'
import BottomBanner from './BottomBanner.vue'
import BuyBnqNow from './BuyBnqNow.vue'
import BuyBnqNowGuest from './BuyBnqNowGuest.vue'
export default {
  components: {
    TopBanner,
    NewsAlert,
    PopularCryptocurrencies,
    CopyTrading,
    ProductSuite,
    BeginnerGuide,
    Community,
    BottomBanner,
    BuyBnqNow,
    BuyBnqNowGuest
  },
  computed: {
    loggedIn() {
      return this.$userinfo.uid != undefined;
    },
  },
}
</script>

<style></style>