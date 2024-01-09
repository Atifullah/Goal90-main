<template>
  <div id="trade-table">
    <div class="trade-table1">
        <a-card class="margin-account-card mb-3" :bordered="false">
          <a-row>
              <a-col :lg="24"><p class="deposit-withdraw-heading fw-5 mb-0">{{$t('wallet.leveraged')}}</p>
                <span class="margin-txt fw-5">{{$t('person.margin_top_notice')}}</span>
            </a-col>
          </a-row>
      </a-card>
      <TradeTable
        v-if="showTable"
        :expand-row-data="false"
      />

    </div>
  </div>
</template>

<script>

import Table from "./Table.vue"
export default {
  name: 'margin',
  components: {
    TradeTable:Table,
  },
  data() {
    return {
      showTable: false,
    }
  },
  mounted() {
    this.showTable = true
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/components/trade-table/trade-table.scss';
</style>
