<template>
  <div class="bnq-introduction mt-10">
    <a-row>
      <a-col :lg="21">
        <p class="mb-2 text-black main-heading fw-5">{{$t('bnq.bnq')}}</p>
        <p class="bnq-desc mb-4 text-black fw-4">{{$t('bnq.bnq_intro')}}</p>
        <a :href="whitePaperLink" class="white-paper primary-btn px-4 py-2" target="_blank">{{$t('bnq.whitepaper')}}</a>
        <!-- <a-button class="white-paper primary-btn px-4">WHITEPAPER</a-button> -->
        <p class="text-black main-heading fw-5 mb-1 mt-6">{{$t('bnq.bnq_benefit')}}</p>
        <p class="bnq-desc mb-0 text-black fw-4">{{$t('bnq.bnq_benifit_desc')}}</p>
        <a-row type="flex">
          <a-col :lg="12" v-for="(list, key) in getBnqList" :key="key" class="mt-6 pr-2">
            <a-row :gutter="8" class="col-alignment">
              <a-col :lg="5"><img :src="list.img" /></a-col>
              <a-col :lg="17">
                <p class="bnq-desc text-black fw-5 mb-2">{{ list.title }}</p>
                <p class="text-black mb-0">{{ list.desc }}</p>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

  </div>
</template>

<script>
import { whitePaperLink } from '~/plugins/constants';

export default {
  data() {
    return {
      whitePaperLink,
      getBnqList: [
        {
          img: '/images/bnq1.svg',
          title: this.$t('bnq.high_apy'),
          desc: this.$t('bnq.high_apy_detail')
        },
        {
          img: '/images/bnq6.svg',
          title: this.$t('bnq.spot_discount'),
          desc: this.$t('bnq.spot_discount_detail')
        },
        {
          img: '/images/bnq2.svg',
          title: this.$t('bnq.project_token'),
          desc: this.$t('bnq.project_token_detail')
        },
        {
          img: '/images/bnq7.svg',
          title: this.$t('bnq.future_guard'),
          desc: this.$t('bnq.future_guard_detail')
        },
        {
          img: '/images/bnq3.svg',
          title: this.$t('bnq.trade_bnq'),
          desc: this.$t('bnq.trade_bnq_detail')
        },
        {
          img: '/images/bnq8.svg',
          title: this.$t('bnq.hold_bnq'),
          desc: this.$t('bnq.hold_bnq_detail')
        },
        {
          img: '/images/bnq4.svg',
          title: this.$t('bnq.bnq_use'),
          desc: this.$t('bnq.bnq_use_detail')
        },
        {
          img: '/images/bnq9.svg',
          title: this.$t('bnq.stake_bnq'),
          desc: this.$t('bnq.stake_bnq_detail')
        },
        {
          img: '/images/bnq5.svg',
          title: this.$t('bnq.bnq_airdrop'),
          desc: this.$t('bnq.bnq_airdrop_detail')
        },

      ]
    }
  }
}
</script>

<style></style>