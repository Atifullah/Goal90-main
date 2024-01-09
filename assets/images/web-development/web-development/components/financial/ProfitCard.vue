<template>
    <div class="">
            <div class="financial-black-card">
            <a-row :gutter="16">
                <a-col :lg="24">
                    <!-- <img src="/images/profit-usdt.svg" class="mb-2"/> -->
                    <p v-if="$userinfo.uid" class="total-assets fw-5 mb-0">{{$usersettings.moreconfig?.fundsvisible?totalAssets:'*******'}} USDT <img class="ml-2 pointer" :src="$usersettings.moreconfig?.fundsvisible?'/images/fin-hide.png':'/images/us-eye-active.svg'" @click="toggleFundVisible" height="15"/> </p>
                    <p v-else class="total-assets fw-5 mb-0">******</p>
                    <span class="assets-pass fw-4">{{ $t('financial.Total_Assets_fin') }}</span>
                </a-col>
                </a-row>
                <a-divider class="center-line"/>
                <a-row :gutter="16">
                <a-col :lg="24">
                    <a-row>
                        <a-col :lg="13" :xl="13">
                            <p v-if="$userinfo.uid" class=" fw-5 mb-0 total-profit">{{$usersettings.moreconfig?.fundsvisible?previousDayProfit:'*******'}} USDT</p>
                            <p v-else class="total-profit fw-5 mb-2">******</p>
                            <span class="assets-pass fw-4">{{ $t('financial.Previous_Day_Prof_fin') }}</span>
                        </a-col>
                        <a-col :lg="11" :xl="11">

                            <p v-if="$userinfo.uid" class="total-profit fw-5 mb-0">{{$usersettings.moreconfig?.fundsvisible?lastMonthProfit:'*******'}} USDT</p>
                            <p v-else class="total-profit fw-5 mb-2">******</p>
                            <span class="assets-pass fw-4">{{ $t('financial.fin_30_days_Prof') }}</span>
                        </a-col>
                    </a-row>
                </a-col>
               
            </a-row>
        </div>
            <a-row class="orange-btn-row mt-4">
                <a-col :lg="24" class="px-2" align="end">
                    <a-button class="primary-btn fw-5 fw-5 gray-btn mr-1 px-2" @click="goTo('/person/financial-deal')">{{ $t('financial.Spot_Details_fin')
                    }}</a-button>
                    <a-button class="primary-btn fw-5 fw-5 px-2" @click="goTo('/person/financial-deal')">{{
                        $t('financial.Transactions_Hist') }}</a-button>
                </a-col>
            </a-row>
   
        </div>
</template>

<script>
export default {
    data() {
        return {
            totalAssets: 0,
            previousDayProfit: 0,
            lastMonthProfit: 0
        }
    },
    methods: {
        getUserAssets() {
            if (this.$userinfo.uid) {
                this.$store.dispatch('get_user_finance_assets').then(({ data }) => {
                    if (data) {
                        this.totalAssets = data.totalasset;
                        this.previousDayProfit = data.financialasset;
                        this.lastMonthProfit = data.totalincome;
                    }
                })
            }
        },
        goTo(link) {
            this.$router.push(link)
        },
        toggleFundVisible(){
      
            this.$store.dispatch('user_user_settings_save', {
        moreConfig: {
          fundsVisible: !this.$usersettings.moreconfig.fundsvisible
        },
      }).then(({
        data
      }) => {
        if (data) {
          this.global_refresh_user_settings();
        }
      })
    }
    },
    mounted() {
        this.getUserAssets();
    }
}
</script>

<style></style>
