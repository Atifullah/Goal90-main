<template>
    <div class="legal-currency">
        <a-card class="buy-sell-card" :bordered="false">
        <a-row>
            <a-col :lg="24"><p class="buy-sell-heading fw-5 mb-0">{{$t('p2p.p2p21')}}</p></a-col>
        </a-row>
    </a-card>
      <a-card :bordered="false" class="mt-3 detail-card">

                <hex-trading ref="trading" :typeOfOrder="1" />

      </a-card>
    </div>
  </template>

  <script>
  import trading from '@/components/legal/legal-trading'
  export default {
    name: 'InProcess',
    components: {
      "hex-trading": trading,
    },
    data() {
      return {
      }
    },
    methods: {

    },
    mounted() {

        if (this.$refs['trading']) {
            this.$refs['trading'].resetSelect();
        }
        this.global_refresh_user_inprocessorders_count();
    }
  }
  </script>

  <style>

  </style>
