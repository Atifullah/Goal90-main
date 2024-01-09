<template>
    <div>
        <div class="blogs-header">
            <div class="main-content">
                <p class="blog-main-heading mb-0 text-black fw-5">
                    <img src="/images/gray-icon-left.svg" class="gray-icon" /> {{ $t("keyWords.blog1") }}
                </p>
            </div>
        </div>
        <div class="main-content">
            <a-row :gutter="16">
                <a-col :lg="16">
                    <a-row>
                        <a-col :lg="19">
                            <p class="fw-5 detail-heading text-black mt-6 mb-2">Building Trust in the Crypto Ecosystem</p>
                            <p class="desc fw-4 text-black">Welcome to the world of Ethereum staking on Binance! Whether
                                you’re
                                new to cryptocurrency or a seasoned investor, understanding the ins and outs of ETH staking
                                is crucial in the ever-evolving crypto landscape. Read on for a guide to Binance ETH
                                Staking, detailing what it is, how you can participate, and what rewards you can expect in
                                return.</p>
                            <p class="date-text mb-5">2023-11-27</p>
                            <p class="text-black sub-title mb-3 fw-5">Building Trust in the Crypto Ecosystem</p>
                            <p class="desc fw-4 text-black mb-5">Welcome to the world of Ethereum staking on Binance!
                                Whether
                                you’re new to cryptocurrency or a seasoned investor, understanding the ins and outs of ETH
                                staking is crucial in the ever-evolving crypto landscape. Read on for a guide to Binance ETH
                                Staking, detailing what it is, how you can participate, and what rewards you can expect in
                                return.</p>
                            <img src="/images/blog-detail.svg" class="mb-5" />
                            <p class="desc fw-4 text-black mb-4">WAs I have said on Twitter earlier, it is an honor and with
                                the deepest humility that I step into the role of Binance’s CEO, succeeding the visionary
                                founder of this incredible company. Over the past six years, Binance has laid a foundation
                                that has positioned it for decades of continued growth and success. Now, my role is to lead
                                our talented and committed team into that future while respecting and learning from the
                                past. This, together with the trust placed on us by our 160M+ users, are heavy
                                responsibilities that I take seriously.</p>
                            <p class="desc fw-4 text-black mb-4">A cornerstone of this organization has always been the idea
                                that innovation should bring value to users. The best way to put this principle into
                                practice – the Binance way – is to consistently deliver best-in-class products that people
                                use and find valuable. As Binance’s new CEO, I am determined to keep steady on this course.
                                We will remain committed to product excellence as we continue to blaze the trail of
                                financial innovation.</p>
                            <p class="desc fw-4 text-black mb-5">I accepted this role with the support of CZ and our
                                leadership team. My commitment is to work tirelessly so that we can meet and exceed the
                                expectations of all stakeholders while achieving our core mission: the freedom of money.
                                With three decades of financial services and regulatory experience under my belt, I
                                understand the unique challenges and opportunities that our industry presents, and I am
                                dedicated to steering us through crypto winters and summers alike.</p>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :lg="8">
                    <div class="share-posts-icon mt-6">
                        <div class="icon-box">
                            <img src="/images/black-like.svg" />
                            <p class="mt-2 fw-5 count mb-0 text-center">117</p>
                        </div>
                        <div class="icon-box">
                            <img src="/images/black-unlike.svg" />
                            <p class="mt-2 fw-5 count mb-0 text-center">16</p>
                        </div>
                    </div>
                    <p class="fw-5 text-black share-post mt-6">Share Posts</p>
                    <div class="share-posts-icon">
                        <div class="icon-box">
                            <img src="/images/gray-facebook.svg" />
                        </div>
                        <div class="icon-box">
                            <img src="/images/gray-medium.svg" />
                        </div>
                        <div class="icon-box">
                            <img src="/images/gray-discord.svg" />
                        </div>
                        <div class="icon-box">
                            <img src="/images/gray-linkedin.svg" />
                        </div>
                        <div class="icon-box">
                            <img src="/images/gray-medium-x.svg" />
                        </div>
                        <div class="icon-box">
                            <img src="/images/gray-telegram.svg" />
                        </div>
                    </div>
                    <p class="mt-6 fw-5 text-black share-post mb-0">Popular crytocurrencies</p>
                    <div class="right-side">
                    <SpotMarket :getClientExchangeRate="getClientExchangeRate" :marketdata="marketData"  tab="2" key="2"/>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import SpotMarket from '~/components/market/SpotMarket.vue'
import { mapGetters,mapActions } from "vuex";
export default {
components: {
    SpotMarket
},
data() {
    return {
        marketData: [],
    }
},
computed:{
    ...mapGetters("market", [
      "getCurrencyDetail",
      "getCurrencyGraphData",
      "getSpotMarkets",
      "getCurrencySpotMarket",
      "getCurrencyMarginMarket",
      "getCurrencyFutureMarket",
      "getCurrencyTradeData",
      "getFavoriteList",
    ]),
},
watch: {
    getCurrencyGraphData: function () {
      this.mcharts();
    },
    getSpotMarkets: function (val) {
      this.marketData = val;
    },
  },
  methods: {
    ...mapActions("market", [
      "fetchQuotationDailyData",
    ]),
    getClientExchangeRate(tradeData) {
      if (tradeData.symble) {
        let symble = tradeData.symble.split("/");
        if (symble.length > 1) {
          symble = symble[1];
        }
        return this.$store.getters.get_client_exchange_rate(
          symble,
          tradeData.c
        );
      }
    },
  },
   mounted(){
    const dailyDetailObject = {
      iscontract: 2,
      displaylocation: 2,
      pageSize: 100,
    };
     this.fetchQuotationDailyData(dailyDetailObject);
  }
}
</script>

<style></style>