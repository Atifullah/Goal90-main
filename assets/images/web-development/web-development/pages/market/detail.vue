<template>
  <div id="common-convert">
    <MarketDetail />
  </div>
</template>

<script>
import MarketDetail from '@/components/market/MarketDetail.vue'
import { currencyIntroductionId, bitnasdaqNewsChannelId } from "~/plugins/constants";
export default {
  async asyncData({ store,route }) {
        const currency = route.query.currency 
        const object = {
        channelId: currencyIntroductionId,
        subTitle: currency,
         };
         const graphDataPharams = {
        fName: currency,
        tName: "usdt",
        type: 0,
      };
         await store.dispatch('market/fetchCurrencyDetail',object);
         await store.dispatch('market/fetchCurrencyGraphData',graphDataPharams);
         const currencyDetail = store.getters['market/getCurrencyDetail'];
         const getCurrencyGraphData = store.getters['market/getCurrencyGraphData'];
         const data = JSON.parse(JSON.stringify(getCurrencyGraphData))
         const graphData= data? data.reverse() : []
         const lastObject =
        graphData.length > 0
          ? graphData[graphData.length - 1]
          : {};
        const lastPrice = lastObject.c;
        store.commit('setTitleSeo', `${currencyDetail.fullname } ${lastPrice} Price, Volume, And Market Statistics – BitNasdaq`);
        store.commit('setDescriptionSeo', `Check out the price fluctuations, market supply, market cap, coin volume, and market statistics of ${currencyDetail.fullname }, here on the BitNasdaq Market place`);
        store.commit('setH1Seo', `${currencyDetail.fullname } ${lastPrice} Price, Volume, And Market Statistics`);

    },
  components: { MarketDetail },
 
}
</script>

<style lang="scss">
    @import '@/assets/scss/pages/common-convert/common-convert.scss';
</style>
