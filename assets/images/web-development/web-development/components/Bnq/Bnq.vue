<template>
    <div>
        <TopBanner />
        <div class="main-content">
            <a-row>
                <a-col :lg="15" :xl="16" :xxl="17">
                    <BnqIntroduction />
                </a-col>
                <a-col :lg="9" :xl="8" :xxl="7">
                    <BuyBnq />
                    <TodayMarket />
                    <OtherCrypto />
                </a-col>
            </a-row>
        </div>
        <BnqRoadmap />
        <SecureBnq />
    </div>
</template>

<script>
import { mapActions } from "vuex";
import TopBanner from '../Bnq/TopBanner.vue'
import BuyBnq from '../Bnq/BuyBnq.vue'
import TodayMarket from './TodayMarket.vue'
import OtherCrypto from './OtherCrypto.vue'
import BnqIntroduction from './BnqIntroduction.vue'
import BnqRoadmap from './BnqRoadmap.vue'
import SecureBnq from './SecureBnq.vue'
export default {
    components: {
        TopBanner,
        BuyBnq,
        TodayMarket,
        OtherCrypto,
        BnqIntroduction,
        BnqRoadmap,
        SecureBnq
    },
    methods: {
        ...mapActions("market", [
            "fetchQuotationDailyData"
        ]),
    },
    mounted() {
        const dailyDetailObject = {
            iscontract: 2,
            displaylocation: 2,
            pageSize: 10,
        }
        this.fetchQuotationDailyData(dailyDetailObject)
    },
  
}
</script>

<style></style>