<template>
  <div class="merchant">
    <a-card class="merchant-card" :bordered="false">
      <p class="mb-0 main-heading fw-5">{{ $t('p2p.ma1') }}
      </p>
    </a-card>
    <a-row>
      <AccountCard />
    </a-row>
    <a-card :bordered="false" class="merchant-list-card mt-3">
      <a-row class="col-alignment advertise-detail">
        <a-col :lg="1" :xl="1"><img src="/images/call1.svg" /></a-col>
        <a-col :lg="14" :xl="15" class="pl-4">
          <p class="mb-0 requirment-title fw-5">{{ $t('p2p.ma3') }} </p>
        </a-col>
        <a-col :lg="5" :xl="5">
          <p class="mb-0 requirment-subtext fw-5"></p>
        </a-col>
        <a-col :lg="4" :xl="3" align="end"><a-button class="outline-btn fw-5"
            :class="isAuthenticated == 'Verified' ? 'green-bg' : ''" block @click="linkNow"><img
              src="/images/green-verify-tick.svg" v-if="isAuthenticated == 'Verified'" class="mr-2" />
            {{ isAuthenticated }}</a-button></a-col>
      </a-row>
      <a-divider class="marchant-divider" />
      <a-row class="col-alignment advertise-detail">
        <a-col :lg="1" :xl="1"><img src="/images/profile-tick.svg" /></a-col>
        <a-col :lg="14" :xl="15" class="pl-4">
          <p class="mb-0 requirment-title fw-5">{{ $t('p2p.ma4') }} </p>
        </a-col>
        <a-col :lg="5" :xl="5">
          <p class="mb-0 requirment-subtext fw-5"></p>
        </a-col>
        <a-col :lg="4" :xl="3" align="end"><a-button class="outline-btn fw-5"
            :class="isKYCVerified == 'Verified' ? 'green-bg' : ''" block @click="verifyNow"><img
              src="/images/green-verify-tick.svg" v-if="isKYCVerified == 'Verified'" class="mr-2" />
            {{ isKYCVerified }}</a-button></a-col>
      </a-row>
      <a-divider class="marchant-divider" />

      <a-row class="col-alignment advertise-detail">
        <a-col :lg="1" :xl="1"><img src="/images/wallet-minus.svg" /></a-col>
        <a-col :lg="14" :xl="15" class="pl-4">
          <p class="mb-0 requirment-title fw-5">{{ $t('p2p.ma5') }} {{ requiredBalance }}USDT {{ $t('p2p.ma6') }} </p>
        </a-col>
        <a-col :lg="5" :xl="5">
          <p class="mb-0 requirment-subtext fw-5"><span class="active pr-2">{{ $t('p2p.ma7') }} </span>{{ available }}USDT</p>
        </a-col>
        <a-col :lg="4" :xl="3" align="end"><a-button class="outline-btn fw-5" block
            @click="showPopTrasfer">{{ $t('p2p.ma8') }} </a-button></a-col>
      </a-row>

      <a-row :gutter="16" class="text-center mt-5">
        <a-col :lg="24">
          <a-checkbox v-model="agreed">
            {{ $t('p2p.ma9') }}
            <span class="active">
              <a target="_blank" href="/terms/p2p-terms">{{ $t('p2p.ma10') }}</a>
            </span>

          </a-checkbox>


        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :lg="5" :offset="9">
          <a-button block class="mt-4 fw-5" :class="isCanApply ? 'primary-btn' : 'disabled-btn'"
            @click="Apply">{{ $t('p2p.ma11') }} </a-button>
        </a-col>
      </a-row>
    </a-card>
    <hex-transfer v-if="transfer_pop" :transfer_pop="transfer_pop" :currencyid="cid" type="5"
      :closePopup="showPopTrasfer" />
    <ApplySuccessModel :applySuccessModel="applySuccessModel" @applySuccessModelClose="applySuccessModelClose()" />

  </div>
</template>

<script>
import AccountCard from './AccountCard.vue'
import transferPop from '@/components/security/transfer';
import ApplySuccessModel from "@/components/AgentPlan/ApplySuccessModal.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    AccountCard,
    ApplySuccessModel,
    'hex-transfer': transferPop,
  },
  computed: {
    ...mapGetters("getFooterData"),
    isCanApply() {
      return this.agreed && this.isAuthenticated === 'Verified' && this.isKYCVerified === 'Verified';
    },
    isAuthenticated() {
      if (this.$userinfo.isemailauthed && this.$userinfo.isphoneauthed) {
        return this.$t('returntxt.rtxt27')
      }
      else if (!this.$userinfo.isemailauthed) {
        return this.$t('returntxt.rtxt28')
      }
      else if (!this.$userinfo.isphoneauthed) {
        return this.$t('returntxt.rtxt29')
      }
      else {
        return this.$t('returntxt.rtxt30')
      }
    },
    isKYCVerified() {
      if (this.$userinfo.securitylevel > 1) {
        return this.$t('returntxt.rtxt27')
      }
      else {
        return this.$t('returntxt.rtxt31')
      }
    },
    getP2pArticle(){
      return getFooterData;
    },

  },
  data() {
    return {
      requiredBalance: 0,
      available: 0,
      agreed: false,
      confirmState: false,
      transfer_pop: false,
      cid: '1533624980247416423',
      applySuccessModel: {},
    }
  },
  methods: {
    getWalletInfo() {
      const _self = this;
      _self.$store.dispatch('trading_user_c2c_userc2cassets_get', {}).then(({ data }) => {
        if (data) {
          const item = data.filter(_d => _d.currency.currencyname == 'USDT')[0];
          this.available = _self.global_get_tofixed(item.canuseamount, _self.global_get_decimal(item.currency.currencyname).a)
        }
      })
    },
    getRequiredBalance() {
      const _self = this;
      _self.$store.dispatch('com_constants_getconstantsinfo', { key: "C2c_ApplyAdv_Frozen", }).then(({ data }) => {
        if (data) {
          _self.requiredBalance = data;
        }
      })
    },
    confirmPopupState() {
      this.confirmState = !this.confirmState;
    },
    confirmpopup(vid, m) {

    },
    linkNow() {
      if (this.isAuthenticated != 'Verified') {
        this.$router.push('/person/security')
      }
    },
    verifyNow() {
      if (this.isKYCVerified != 'Verified') {
        this.$router.push('/person/authentication')
      }
    },
    showPopTrasfer() {
      this.getWalletInfo();
      this.getRequiredBalance();
      this.transfer_pop = !this.transfer_pop;
    },
    Apply() {
      if (this.isAuthenticated == "Link Email") {
        this.$store.commit('set_message',
          { type: 'error', text: this.$t('texts.txt16') });
        return
      }
      if (this.isAuthenticated == "Link Phone") {
        this.$store.commit('set_message',
          { type: 'error', text: this.$t('texts.txt17') });
        return
      }
      if (this.isKYCVerified !== "Verified") {
        this.$store.commit('set_message',
          { type: 'error', text: this.$t('texts.txt18') });
        return
      }
      if (parseInt(this.requiredBalance) > parseInt(this.available)) {
        this.$store.commit('set_message',
          { type: 'error', text: this.$t('texts.txt19') });
        return
      }
      this.$store.dispatch("user_user_settings_save",
        {
          moreConfig: {
            applyAdv: true,
          }
        }
      ).then((res) => {
        if (res.data) {


          this.applySuccessModel = {
            ServerMessage: res.msg,
            ClientMessage: this.$t('person.merchant_msg'),
          }
        }
      })
    },
    applySuccessModelClose() {
      this.applySuccessModel = {};
      this.$router.push('/person/p2p')
      this.global_refresh_user_settings();
    },
  },
  mounted() {
    this.getWalletInfo();
    this.getRequiredBalance();
  }
}
</script>

<style></style>
