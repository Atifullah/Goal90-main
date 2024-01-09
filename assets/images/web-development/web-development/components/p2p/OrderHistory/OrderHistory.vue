<template>
  <div class="legal-currency">
    <a-card class="buy-sell-card" :bordered="false">
      <a-row>
        <a-col :lg="24">
          <p class="buy-sell-heading fw-5 mb-0">{{ $t('modals.orh1') }}</p>
        </a-col>
      </a-row>
    </a-card>
    <a-card :bordered="false" class="mt-3 detail-card">
      <hex-transaction ref="transaction" />
    </a-card>
  </div>
</template>
  
<script>
import transaction from '@/components/legal/legal-transaction'
export default {
  name: 'legal-currency',
  components: {
    "hex-transaction": transaction,
  },
  mounted() {
    if (this.$refs['transaction']) {
      this.$refs['transaction'].resetSelect();
    }
  }
}
</script>
  
<style></style>
  