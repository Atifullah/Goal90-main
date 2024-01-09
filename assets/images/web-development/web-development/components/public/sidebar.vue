<template>
  <div id="side-bar">
    <div class="side-menu">
      <a-menu :default-selected-keys="[selfRoute.person]" :open-keys.sync="openKeys" v-model="selectedKey" mode="inline"
        @click="handleClick">
        <a-sub-menu key="sub1" @titleClick="titleClick">
          <span slot="title" class="user-center">{{ $t('person.memberCenter') }}</span>
          <!-- <template slot="title">
                    <a-icon type="qq" /><span>Item 1</span>
                    </template> -->
          <a-menu-item :key="selfRoute.person" class="home-first sidebar-border" @mouseover="hoverKey = selfRoute.person"
            @mouseleave="hoverKey = ''"><nuxt-link :to="{ path: selfRoute.person }">
              <img
                :src="(selectedKey[0] == selfRoute.person || hoverKey == selfRoute.person) ? '/images/home-active.svg' : '/images/home.svg'"
                class="sidebar-icon" />{{ $t('person.home') }}</nuxt-link>
          </a-menu-item>
          <a-menu-item :key="selfRoute.authentication" class="" @mouseover="hoverKey = selfRoute.authentication"
            @mouseleave="hoverKey = ''">
            <nuxt-link :to="{ path: selfRoute.authentication }"><img
                :src="(selectedKey[0] == selfRoute.authentication || hoverKey == selfRoute.authentication) ? '/images/identity-active.svg' : '/images/identity.svg'"
                class="sidebar-icon" />{{ $t('person.authentication') }}
            </nuxt-link>
          </a-menu-item>

          <a-menu-item :key="selfRoute.invitation" @mouseover="hoverKey = selfRoute.invitation"
            @mouseleave="hoverKey = ''"><nuxt-link :to="{ path: selfRoute.invitation }"><img
                :src="(selectedKey[0] == selfRoute.invitation || hoverKey == selfRoute.invitation) ? '/images/invite-active.svg' : '/images/invite.svg'"
                class="sidebar-icon" />{{ $t('invitation.Invite') }}</nuxt-link>
          </a-menu-item>
          <a-menu-item :key="selfRoute.tickets" @mouseover="hoverKey = selfRoute.tickets" @mouseleave="hoverKey = ''">
            <nuxt-link :to="{ path: selfRoute.tickets }"><img
                :src="(selectedKey[0] == selfRoute.tickets || hoverKey == selfRoute.tickets) ? '/images/my-ticket-active.svg' : '/images/my-ticket.svg'"
                class="sidebar-icon" /> {{ $t('public.mt') }} </nuxt-link>
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="sub2" @titleClick="titleClick">
          <span slot="title" class="sub-item fw-6"> {{ $t('legalTrad.asset') }}</span>
          <a-menu-item :key="selfRoute.wallet" @mouseover="hoverKey = selfRoute.wallet"
            @mouseleave="hoverKey = ''"><nuxt-link :to="{ path: selfRoute.wallet }"><img
                :src="(selectedKey[0] == selfRoute.wallet || hoverKey == selfRoute.wallet) ? '/images/spot-account-active.svg' : '/images/spot-account.svg'"
                class="sidebar-icon" />{{ $t('person.chargeMoney') }}</nuxt-link></a-menu-item>
          <a-menu-item :key="selfRoute.personP2p" @mouseover="hoverKey = selfRoute.personP2p" @mouseleave="hoverKey = ''">

            <a-row :gutter="16">
              <a-col :lg="20">
                <nuxt-link :to="{ path: selfRoute.personP2p }" class="p2p-account-txt"><img
                    :src="(selectedKey[0] == selfRoute.personP2p || hoverKey == selfRoute.personP2p) ? '/images/us-p2p-account-active.svg' : '/images/us-p2p-account.svg'"
                    class="sidebar-icon" /> {{ $t('public.p2pa') }}</nuxt-link>
              </a-col>
              <a-col :lg="4">
                <img @click="$router.push('/p2p/p2p-account')" src="/images/external-link.svg" />
              </a-col>
            </a-row>

          </a-menu-item>
          <!-- moved to playcard branh -->
          <!-- <a-menu-item :key="selfRoute.gameAccount" @mouseover="hoverKey = selfRoute.gameAccount" @mouseleave="hoverKey = ''">
                  <nuxt-link :to="{path:selfRoute.gameAccount}"><img :src="(selectedKey[0]==selfRoute.gameAccount || hoverKey==selfRoute.gameAccount) ? '/images/spot-account-active.svg':'/images/spot-account.svg'" class="sidebar-icon"/>{{$t('game.gameaccount')}}</nuxt-link>
                </a-menu-item> -->

          <a-menu-item :key="selfRoute.margin" @mouseover="hoverKey = selfRoute.margin"
            @mouseleave="hoverKey = ''"><nuxt-link :to="{ path: selfRoute.margin }"><img
                :src="(selectedKey[0] == selfRoute.margin || hoverKey == selfRoute.margin) ? '/images/margin-account-active.svg' : '/images/us-margin-account.svg'"
                class="sidebar-icon" />{{ $t('wallet.leveraged') }}</nuxt-link></a-menu-item>
          <a-menu-item :key="selfRoute.contract" @mouseover="hoverKey = selfRoute.contract"
            @mouseleave="hoverKey = ''"><nuxt-link :to="{ path: selfRoute.contract }"><img
                :src="(selectedKey[0] == selfRoute.contract || hoverKey == selfRoute.contract) ? '/images/future-account-active.svg' : '/images/us-future-account.svg'"
                class="sidebar-icon" />{{ $t('contract.contractAcc') }}</nuxt-link></a-menu-item>
          <a-menu-item :key="selfRoute.walletHistory" @mouseover="hoverKey = selfRoute.walletHistory"
            @mouseleave="hoverKey = ''"><nuxt-link :to="{ path: selfRoute.walletHistory }">
              <svg class="sidebar-icon svg-icon" width="17" height="17">
                <use
                  :xlink:href="(selectedKey[0] == selfRoute.walletHistory || hoverKey == selfRoute.walletHistory) ? '/images/svg/sprite.svg#billing-details-active-icon' : '/images/svg/sprite.svg#billing-details-icon'">
                </use>
              </svg>

              {{ $t('leverage.zj_capitalflow') }}</nuxt-link></a-menu-item>
        </a-sub-menu>


        <a-sub-menu key="sub4">
          <span slot="title" class="sub-item fw-6">{{ $t('person.deal') }}</span>
          <a-menu-item :key="selfRoute.financialDeal" @mouseover="hoverKey = selfRoute.financialDeal"
            @mouseleave="hoverKey = ''"><nuxt-link :to="{ path: selfRoute.financialDeal }"><img
                :src="(selectedKey[0] == selfRoute.financialDeal || hoverKey == selfRoute.financialDeal) ? '/images/financial-active.svg' : '/images/us-financial.svg'"
                class="sidebar-icon" />{{ $t('manage.Cooperation') }}</nuxt-link></a-menu-item>

          <a-menu-item :key="selfRoute.deal" @mouseover="hoverKey = selfRoute.deal" @mouseleave="hoverKey = ''"><nuxt-link
              :to="{ path: selfRoute.deal }"><img
                :src="(selectedKey[0] == selfRoute.deal || hoverKey == selfRoute.deal) ? '/images/spot-active.svg' : '/images/us-spot.svg'"
                class="sidebar-icon" />{{ $t('home.headCionDeal') }}</nuxt-link></a-menu-item>
          <a-menu-item :key="selfRoute.marginDeal" @mouseover="hoverKey = selfRoute.marginDeal"
            @mouseleave="hoverKey = ''"><nuxt-link :to="{ path: selfRoute.marginDeal }"><img
                :src="(selectedKey[0] == selfRoute.marginDeal || hoverKey == selfRoute.marginDeal) ? '/images/margin-active.svg' : '/images/us-margin.svg'"
                class="sidebar-icon" />{{ $t('leverage.margin') }}</nuxt-link></a-menu-item>
          <a-menu-item :key="selfRoute.contractDeal" @mouseover="hoverKey = selfRoute.contractDeal"
            @mouseleave="hoverKey = ''"><nuxt-link :to="{ path: selfRoute.contractDeal }"><img
                :src="(selectedKey[0] == selfRoute.contractDeal || hoverKey == selfRoute.contractDeal) ? '/images/future-active.svg' : '/images/future.svg'"
                class="sidebar-icon" />{{ $t('contract.contractDeal') }}</nuxt-link></a-menu-item>
          <!-- moved to playcard branh -->
          <!-- <a-menu-item :key="selfRoute.gameOrders" @mouseover="hoverKey = selfRoute.gameOrders" @mouseleave="hoverKey = ''">
                  <nuxt-link :to="{path:selfRoute.gameOrders}"><img :src="(selectedKey[0]==selfRoute.gameOrders || hoverKey==selfRoute.gameOrders) ? '/images/spot-account-active.svg':'/images/spot-account.svg'" class="sidebar-icon"/>Game</nuxt-link>
                </a-menu-item> -->

          <a-menu-item :key="selfRoute.convertHistory" @mouseover="hoverKey = selfRoute.convertHistory"
            @mouseleave="hoverKey = ''"><nuxt-link :to="{ path: selfRoute.convertHistory }"><img
                :src="(selectedKey[0] == selfRoute.convertHistory || hoverKey == selfRoute.convertHistory) ? '/images/convert-history-active.svg' : '/images/convert-history.svg'"
                class="sidebar-icon" />{{ $t('manage.Converthistory') }}</nuxt-link></a-menu-item>

        </a-sub-menu>
        <a-sub-menu key="sub5">
          <span slot="title" class="sub-item fw-6">{{ $t('person.security') }}</span>
          <a-menu-item :key="selfRoute.security" @mouseover="hoverKey = selfRoute.security"
            @mouseleave="hoverKey = ''"><nuxt-link :to="{ path: selfRoute.security }"><img
                :src="(selectedKey[0] == selfRoute.security || hoverKey == selfRoute.security) ? '/images/security-setting-active.svg' : '/images/security-setting.svg'"
                class="sidebar-icon" />{{ $t('person.settings') }}</nuxt-link></a-menu-item>
          <a-menu-item :key="selfRoute.withdraw" @mouseover="hoverKey = selfRoute.withdraw"
            @mouseleave="hoverKey = ''"><nuxt-link :to="{ path: selfRoute.withdraw }"><img
                :src="(selectedKey[0] == selfRoute.withdraw || hoverKey == selfRoute.withdraw) ? '/images/withdrawal-address-active.svg' : '/images/withdrawal-address.svg'"
                class="sidebar-icon" />{{ $t('person.address') }}</nuxt-link></a-menu-item>
          <a-menu-item :key="selfRoute.history" @mouseover="hoverKey = selfRoute.history"
            @mouseleave="hoverKey = ''"><nuxt-link :to="{ path: selfRoute.history }"><img
                :src="(selectedKey[0] == selfRoute.history || hoverKey == selfRoute.history) ? '/images/login-history-active.svg' : '/images/us-login-history.svg'"
                class="sidebar-icon" />{{ $t('person.loginHistory') }}</nuxt-link></a-menu-item>
                <a-menu-item :key="selfRoute.api" @mouseover="hoverKey = selfRoute.api" @mouseleave="hoverKey = ''">
            <nuxt-link
              :to="{ path: selfRoute.api }"><img
                :src="(selectedKey[0] == selfRoute.api || hoverKey == selfRoute.api) ? '/images/api-active.svg' : '/images/us-api.svg'"
                class="sidebar-icon" />{{ $t('person.ceartApi') }}
              </nuxt-link>
            </a-menu-item>
 
            <a-menu-item :key="selfRoute.deleteAccount" @mouseover="hoverKey = selfRoute.deleteAccount" @mouseleave="hoverKey = ''">
            <nuxt-link
              :to="{ path: selfRoute.deleteAccount }"><img
                :src="(selectedKey[0] == selfRoute.deleteAccount || hoverKey == selfRoute.deleteAccount) ? '/images/gray-trash-active.svg' : '/images/gray-trash.svg'"
                class="sidebar-icon" /> {{ $t('home.deleteAccount') }}
              </nuxt-link>
            </a-menu-item>

        </a-sub-menu>
      </a-menu>

    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      current: ['mail'],
      openKeys: ['sub1', 'sub4', 'sub2', 'sub5'],
      selectedKey: [],
      hoverKey: '',
    }
  },
  watch: {
    openKeys(val) {
    },
    '$route': {
      handler: function () {
        this.$set(this.selectedKey, 0, this.$store.state.route.active);
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    hovers: function () {
      return this.$store.state.hovers
    },
    selfRoute: function () {
      return this.$store.state.route
    }
  },
  methods: {
    handleClick(e) {
    },
    titleClick(e) {
    },
  },
  mounted() {
    this.$set(this.selectedKey, 0, this.$store.state.route.active);
  }
}
</script>

<style lang="scss">@import '@/assets/scss/components/sidebar/sidebar.scss';</style>
