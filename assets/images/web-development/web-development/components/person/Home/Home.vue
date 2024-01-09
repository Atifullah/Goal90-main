<template>
  <div id="home" class="">
    <a-card class="mailbox-card" :bordered="false">
      <a-row :gutter="16">
        <a-col :lg="1" class="pr-0"><img src="/images/lamp-charge.svg" /></a-col>
        <a-col :lg="12" class="pl-0"
          ><p class="pin-txt fw-5 mb-0">
            {{$t('person.ph2')}}
          </p></a-col
        >
      <a-col :lg="11" align="end"><nuxt-link to="/all-notification"><span class="pin-txt fw-5 mb-0">{{$t('person.notice_top_more')}}</span></nuxt-link></a-col>
      </a-row>
    </a-card>
    <a-row :gutter="16">
      <a-col :lg="16">
        <a-row class="pt-3">
          <UserProfileCard />
        </a-row>
        <a-row class="pt-3">
          <EstimatedGraph />
        </a-row>
        <a-row class="pt-3">
          <MarketTable />
        </a-row>
      </a-col>
      <a-col :lg="8">
        <a-row class="pt-3">
          <RecentTransactions />
        </a-row>
        <a-row class="pt-3">
          <MoreServices />
        </a-row>
        <a-row class="pt-3">
          <Explore />
        </a-row>
      </a-col>
    </a-row>

  </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
        }
    }
}
</script>
<style lang="scss">
@import '@/assets/scss/pages/user-center/home.scss';
</style>
