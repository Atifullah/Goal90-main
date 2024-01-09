<template>
  <div class="recent-transactions">
    <a-card class="recent-card" :bordered="false">
      <a-row :gutter="16" class="col-alignment mb-2 px-4">
        <a-col :lg="17" :xl="14">
          <p class="all-main-heading mb-0">{{ $t('person.ph4') }}</p>
        </a-col>
        <a-col align="end" :lg="7" :xl="10"><nuxt-link to="/person/wallet-history" class="more-transactions fw-6">
            <p class="mb-0  pointer" v-if="transactions.length > 4">{{ $t('person.notice_top_more') }}</p>
          </nuxt-link></a-col>
      </a-row>
      <a-row :gutter="16" v-if="!loading">
        <a-col :lg="24">
          <div class="text-center"><img v-if="transactions.length == 0" src="images/verified.png" height="60px"
              class="mb-5" /></div>
        </a-col>
      </a-row>
      <AppLoading height="10vh" backgroundColor="transparent" v-if="loading" />
      <a-row v-if="!loading" v-for="(list, key) in transactions" :key="key" class="transaction-list pointer px-4">
        <a-col :lg="24">
          <div @mouseover="hoverKey = key" @mouseleave="hoverKey = -1">
            <a-row :gutter="16" class="col-alignment pb-2 pt-2">
              <a-col :lg="2" :xl="2" class="pt-2">

                <img v-if="list.typename == 'Deposit'"
                  :src="hoverKey == key ? '/images/deposit-acitve.svg' : '/images/deposit.svg'" height="20px" />
                <img v-else-if="list.typename == 'Withdraw'"
                  :src="hoverKey == key ? '/images/withdraw-r-active.svg' : '/images/withdraw-r.svg'" height="20px" />
                <img v-else-if="list.typename == 'Receive'"
                  :src="hoverKey == key ? '/images/receive-active.svg' : '/images/receive.svg'" height="20px" />
                <img v-else-if="list.typename == 'Send'"
                  :src="hoverKey == key ? '/images/us-send-active.svg' : '/images/us-send.svg'" height="20px" />
              </a-col>
              <a-col :lg="7" :xl="10" class="pl-3 pt-2">
                <p class="mb-0 service-heading fw-5">{{ list.typename }}</p>
                <span class="services-desc fw-4">{{ global_get_local_time(list.createtime).format('HH:mm:ss') }}</span>
              </a-col>
              <a-col :lg="15" :xl="12" align="end" class="pt-2">
                <p class="mb-0 service-heading fw-5">{{ global_get_tofixed(
                  list.amount,
                  global_get_decimal(getCurrencyName(list.currencyid)).a
                ) }} {{ getCurrencyName(list.currencyid) }}</p>
                <p class="mb-0">
                  <span class="dot"><img src="/images/dot.svg" /></span><span class="services-desc fw-4 ml-1">{{
                    list.status
                  }}</span>
                </p>
              </a-col>
            </a-row>

          </div>
          <a-divider class="my-0 recent-list-divider" v-if="key != transactions.length - 1" />

        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import AppLoading from '~/components/AppLoading.vue';


export default {
  data() {
    return {
      transactions: [],
      hoverKey: -1,
      loading: true
    };
  },
  methods: {
    async getRecentTransactions() {
      this.loading = true
      try {
        const { data } = await this.$store.dispatch('user_assets_deposit_withdraw_record_get');
        if (data) {
          this.transactions = data.slice(0, 6);
        }
        this.loading = false
      }
      catch (error) {
        //console.log(error);
        this.loading = false
      }
    },
    getCurrencyName(id) {
      const cname = this.$store.state.currencyinfos.filter(item => item.id == id)[0].currencyname;
      return cname;
    }
  },
  mounted() {
    this.getRecentTransactions();
  },
  components: { AppLoading }
}
</script>

<style></style>
