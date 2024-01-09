<template>
    <div class="p2p-account">
      <a-card class="deposit-card mb-3" :bordered="false">
        <a-row>
          <a-col :lg="24">
            <p class="deposit-withdraw-heading fw-5 mb-0">{{$t('game.game3')}}</p>
            <p class="mb-0 margin-txt fw-5">{{ $t('p2p.p2p22') }}</p>
          </a-col>
        </a-row>
      </a-card>
      <a-card class="deposit-card" :bordered="false">
        <a-row :gutter="16" class="col-alignment">
          <a-col :lg="14">
            <p class="total-blance fw-5 mb-0">{{ $t('wallet.totalAssets') }}</p>
            <p class="deposit-blance fw-6 mb-0">
              {{ totalAssets }} BTC <span class="limit-txt fw-4">≈ {{ allTransition }}
                {{ $store.state.hex_client_exchange.active.toUpperCase().toUpperCase() }}</span>
            </p>
          </a-col>
          <a-col :lg="10" align="end">
            <nuxt-link to="/play-card"> <a-button
                class="outline-btn fw-5 mr-2">{{$t('play_game.pg')}}</a-button></nuxt-link>
            <!-- <a-button class="outline-btn mt-1 mr-2" v-if="!$usersettings.moreconfig?.applyadv"
              @click="becomeMerchant">{{ $t('person.be_merchant') }}</a-button>
            <nuxt-link to="/p2p/post-new-add" v-else> <a-button
                class="outline-btn mt-1  px-4">{{ $t('person.post_ad') }}</a-button></nuxt-link> -->

        </a-col>
      </a-row>
    </a-card>
    <GameDataTable :currencyData="currencyData" :getWalletInfo="getWalletInfo" />
  </div>
</template>

<script>
import GameDataTable from "./GameDataTable.vue"
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'GameAccount',
  components: {
    GameDataTable
  },

  data() {
    return {
      // currencyData: [],
      currencyStatus: true,

    }
  },
  computed: {
    ...mapGetters('playcard', ['getUserGameAssets']),
    totalAssets: function () {
      const _this = this;
      let allbtc = 0;
      //console.log('this.currencyData:', this.currencyData);
      this.currencyData.forEach((item) => {
        allbtc += this.$store.getters.get_btc_exchange_rate(item.currencyname, item.amount)
        // allbtc += this.$store.getters.get_btc_exchange_rate(item.currencyname, item.lockamount)
      });
      _this.decimal = this.global_get_decimal('btc');
      return this.global_get_tofixed(allbtc, _this.decimal.a);
    },
    currencyData: function () {
      return this.getUserGameAssets ? this.getUserGameAssets : []
    },
    allTransition: function () {
      let alltransition = this.$store.getters.get_client_exchange_rate('btc', this.totalAssets);
      return alltransition;
    },

  },
  methods: {
    ...mapActions('playcard', ['fetchUserGameAssets']),
    getWalletInfo() {
      this.fetchUserGameAssets({})
    },
    becomeMerchant() {
      this.$router.push('/p2p/merchant')
    }
  },
  mounted() {
    this.getWalletInfo({})
  }
}
</script>

<style></style>
