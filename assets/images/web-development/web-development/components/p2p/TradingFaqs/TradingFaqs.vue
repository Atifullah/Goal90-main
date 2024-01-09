<template>
  <div id="beginners-guide">
    <a-card class="card-tabs mb-3" :bordered="false" :title="$t('tableskeys.lss11')">
      <a-tabs v-model="selectedRadio" @change="handleTabChange">
        <a-tab-pane key="p2p_General_faqs" :tab="$t('tabkeys.tab31')">
        </a-tab-pane>
        <a-tab-pane key="p2p_posting_faqs" :tab="$t('tabkeys.tab32')">
        </a-tab-pane>
        <a-tab-pane key="p2p_payment_faqs" :tab="$t('tabkeys.tab33')">
        </a-tab-pane>
        <a-tab-pane key="p2p_account_faqs" :tab="$t('tabkeys.tab34')">
        </a-tab-pane>
        <a-tab-pane key="p2p_express_faqs" :tab="('Express')">
        </a-tab-pane>
        <a-tab-pane key="p2p_banktransfer_faqs" :tab="('Bank Transfer')">
        </a-tab-pane>
       <a-tab-pane key="order-history-faq" :tab="('Order-History')">
          </a-tab-pane>
      </a-tabs>
      <a-row class="py-4 mt-1" v-if="selectedRadio !== null">
      <Faqs :channelid="77" :subtitle="selectedRadio" />
    </a-row>
    </a-card>

  </div>

</template>

<script>
import Faqs from '@/components/public/Faqs.vue'
export default {
    components: {
    Faqs, // Register the FAQ component
  },
  data() {
    return {
      selectedRadio: 'p2p_General_faqs', // Initialize selectedRadio to null
    };
},
methods: {
    handleTabChange(key) {
      this.selectedRadio = key;
    },
  },
}
</script>

<style>

</style>
